import { King } from './king';
import { ChessGameService } from '../chess-game.service';
import { Piece } from './piece';
import { Tile } from './tile';

function randVal(array: any[]){
	return array[Math.floor(Math.random()*array.length)];
}

export class Player{
	computer: false;
	color: string;
	game: ChessGameService;
	pieceId: number = 0;
	pieces: Piece[] = [];
	kings: Piece[] = [];
	queens: Piece[] = [];
	rooks: Piece[] = [];
	bishops: Piece[] = [];
	knights: Piece[] = [];
	pawns: Piece[] = [];
	pieceCount(): number{return this.pieces.length};
	kingCount(): number{return this.kings.length};

  // Possible move tiles
	moveTiles: Tile[] = [];
  // Tiles the player can hit, assuming there is an enemy piece (pawns)
	hitTiles: Tile[] = []; 
  // Tile the player moved from last turn
	prevTile: Tile = null; 
  // Piece player moved last turn
	prevPiece: Piece = null; 
  // How many times previous piece has been moved back-to-back
	moveCount: number = 0; 
	activePiece: Piece = null;
	turn: boolean = false;
	enemy: Player = null; //Defined after creation

  constructor(color: string, game: ChessGameService, computer: boolean){
      this.color = color;
      this.game = game;
      this.pieceId = 0;
  }
	
	//Looks all possible tiles where pieces can move to
	checkAllTiles(){
		this.moveTiles = [];
		this.hitTiles = [];
		for(var i = 0; i < this.pieceCount(); i++){
			this.pieces[i].tileCheck();
		}
	}
	
	// Sets protectsKing value at the beginning of the turn. Need to be applied after both players have done checkAllTiles.
	findKingProtectors(){
		for(var i = 0; i < this.pieceCount(); i++){
			this.pieces[i].protectsKing = this.pieces[i].tile.protectsKing(this);
		}
	}
	
	// Goes through array of tiles and pieces and tells which combination is least risky for the piece. If many with same risk, result is randomized.
	// Returns piece, tile and risk. [piece,tile,risk]
	// Often either pieces or tiles is an array with single value
	// Is used by computer logic
	// Setting 1: pieces is 2-dimensional array: [[piece1,tile1],[piece2,tile2],[piece3,tile3],...], tiles is ignored
	findSmallestRisk(pieces: Piece[], tiles: Tile[], setting?: number){
		var setting = setting || 0;
		var riskValue = 10000;
		var safest: any = [];
		for(var i=0;i<pieces.length;i++){
			var piece = pieces[i];
			if(setting==1){
				tiles = [piece[1]];
				piece = piece[0];
			}
			for(var j=0;j<tiles.length;j++){
				var risk = tiles[j].riskValue(piece);
				if(risk <= riskValue){
					if(risk<riskValue){
						safest = [];
					}
					safest.push([piece,tiles[j],risk])
					riskValue = risk;
				}
			}
		}
		// Return random piece/tile combination, with lowest risk
		return randVal(safest);
	}
	// Helper function for approachTile. Adds appropriate piece/tile combinations to piece_tile array and returns it back
	approachTileLoop(tiles: Tile[], piece_tile: any, types: string[], moveTiles: Tile[], type: string, safe: boolean, depth: number){
		for(var j=0;j<tiles.length;j++){
			if((safe && tiles[j][this.enemy.color + "Hits"].length > 0)){
				continue;
			}
			if(depth == 2){ // Approach tiles from which could be approached further
				piece_tile = piece_tile.concat(this.approachTile(tiles[j],moveTiles,type,safe,1));
			}else{
				for(var k=0;k<tiles[j][this.color + "s"].length;k++){
					var piece = tiles[j][this.color + "s"][k];
					console.log(piece);
					if(!piece.protectsKing  && _.contains(types, piece.type)){
						piece_tile.push([piece,tiles[j]]);
					}
				}
			}
		}
		return piece_tile;
	}
	
	// Returns an array of possible piece/tile combinations, which could allow the piece to target tile on the next turn.
	// tile: tile, moveTiles: [tile1, tile2, ...], type: "all", "bishop", "rook", "knight", safe: boolean
	// Return: [[piece1, tile1],[piece2, tile2], ...]
	approachTile(tile: Tile, moveTiles: Tile[], type: string, safe: boolean, depth: number){
		var tiles: Tile[] = [];
		var piece_tile: any[] = []; // piece/tile combinations for approaching
		var depth = depth || 1;
		var player = this;
		if(type == 'all' || type =='rook'){
			// Horizontal and vertical, rooks and queens
			tiles = tiles.concat(tile.checkDirections(1,0,8));
			tiles = tiles.concat(tile.checkDirections(0,1,8));
			if(depth==1){
				tiles = _.intersection(tiles,moveTiles);
			}
			tiles = tiles.filter((tile) => !tile.isFriend(player));
			piece_tile = this.approachTileLoop(tiles,piece_tile,["rook","queen"],moveTiles,"rook",safe,depth);
		}
		if(type == 'all' || type=='bishop'){
			// Diagonal, bishops and queens
			tiles = tile.checkDirections(1,1,8);
			if(depth==1){
				tiles = _.intersection(tiles,this.moveTiles);
			}
			tiles = tiles.filter(function(tile){return !tile.isFriend(player);})
			piece_tile = this.approachTileLoop(tiles,piece_tile,["bishop","queen"],moveTiles,"bishop",safe,depth);
		}
		if(type == 'all' || type == 'knight'){
			// Knight
			tiles = tile.checkDirections(2,1,1);
			tiles = tiles.concat(tile.checkDirections(1,2,1));
			if(depth==1){
				tiles = _.intersection(tiles,this.moveTiles);
			}
			tiles = tiles.filter(function(tile){return !tile.isFriend(player);})
			piece_tile = this.approachTileLoop(tiles,piece_tile,["knight"],moveTiles,"knight",safe,depth);
		}
		return piece_tile;
	}
	
	// Computer logic, returns the piece and the tile, [piece, tile]
	chooseTarget(){
		var safeTiles: Tile[] = []; // Tiles where enemy can't reach, but the player can, and movable pieces don't protect the king
		var hitTiles: Tile[] = []; // Enemy tiles player can hit
		var dangerTiles: Tile[] = []; // Player tiles enemy can hit
		var pieceLocations: Tile[] = []; // Tiles where player's pieces are 
		var enemyLocations: Tile[] = []; // Tiles where enemy's pieces are
		var enemy = this.enemy;
		var colors = this.color + "s";
		var ecolors = this.enemy.color + "s";
		
		// Find current friendly/enemy positions
		for(var i=0;i<this.pieceCount();i++){
			pieceLocations.push(this.pieces[i].tile);
		}
		for(var i=0;i<enemy.pieceCount();i++){
			enemyLocations.push(enemy.pieces[i].tile);
		}
		
		safeTiles = _.difference(this.moveTiles,enemy.hitTiles);
		hitTiles = _.intersection(this.hitTiles,enemyLocations);
		dangerTiles = _.intersection(enemy.moveTiles,pieceLocations);
		
		var moveTile: Tile = null;
		var movePiece: Piece = null;
		var riskValue = 100;
		
		// 1. Kill the enemy king (if possible)
		for(var i=0;i<enemy.kings.length;i++){
			if(enemy.kings[i].threats().length > 0){
				console.log("Can kill the king");
				return [randVal(enemy.kings[i].threats()),enemy.kings[i].tile];
			}
		}
		
		// 2. Protect the king (if in danger)
		for(var k=0;k<this.kings.length;k++){
			if(_.contains(dangerTiles,this.kings[k].tile)){
				// King is in danger
				console.log("King in danger");
				let king: King = this.kings[k];
				// 2.1. Move the king, if 2 or more enemies targetting
				if(king.threats.length > 1){
					console.log("More than 1 threat");
					// More than 1 enemy, king must move (it's impossible to kill/block 2 enemies at the same time)
					var safeMoves = _.intersection(king.moveTiles,safeTiles); // Tiles king can go to safely
					if(safeMoves.length > 0){ 
						return this.findSmallestRisk([king],safeMoves); // Find the best tile to go to (one with an enemy, perhaps)
					}
					// If no safe moves, there is no way to safe the king - unless the opponent doesn't notice
					// (In this version the game goes on even in check-mate situation)
				}
				// 2.2 Try to kill the enemy threat
				var enemyTarget = randVal(king.tile[ecolors]);
				var movePieces = enemyTarget.threats().filter((piece: Piece) => !piece.protectsKing);
				movePiece = null;
				riskValue = 10000;
				if(movePieces.length > 0){ // There is someone who can kill it, that isn't protecting the king
					console.log("Threat can be killed");
					if(enemyTarget.friends().length > 0){ // killing is risky
						moveTile = enemyTarget.tile;
						var riskInfo = this.findSmallestRisk(movePieces,[moveTile]);
						movePiece = riskInfo[0];
						riskValue = riskInfo[2];
						// Doesn't return yet, will see later on if there are better options (2.3 or 2.4)
					}else{// Killing is safe
						console.log("Killing is safe");
						return this.findSmallestRisk(movePieces,[enemyTarget.tile]);
					}
				}
				// 2.3 Move king to safety (if killing is too risky)
				var safeMoves = _.intersection(king.moveTiles,safeTiles); // Tiles king can go to safely
				
				// Make sure that the king doesn't go along the enemy's gaze
				if(enemyTarget.type != 'pawn' && enemyTarget.type != 'knight'){
					safeMoves = safeMoves.filter(function(tile){return !king.tile.isBetween(tile,enemyTarget.tile)})
				}
				
				if(safeMoves.length > 0 && riskValue >= 0){ 
					console.log("2.3 Move king to safety");
					return this.findSmallestRisk([king],safeMoves);
				}
				
				// 2.4 Block the enemy
				if(enemyTarget.type != "knight"){ // Knights can't be blocked
					console.log("2.4 Try to block the enemy")
					var tilesBetween = king.tile.tilesBetween(enemyTarget.tile);
					 for(var i=0;i<tilesBetween.length;i++){
						 var tile = tilesBetween[i];
						 var pieces = tile[colors].filter(function(piece: Piece){return !piece.protectsKing && piece != king});
						 if(pieces.length > 0){
							 var riskInfo = this.findSmallestRisk(pieces,[tile]);
							 var risk = riskInfo[2];
							 if(risk < riskValue){
								 moveTile = tile;
								 movePiece = riskInfo[0];
								 riskValue = risk;
							 }
						 }
					 }
				}
				 // Risky kill / Blocking depends on lowest risk. If none suitable, king will likely die.
				 if(movePiece != null && moveTile != null){
					 return [movePiece, moveTile];
				 }
			}
		}
		
		//3. Approach the king (hitting distance, if safe)
		
		if(this.moveCount <= 6){ // To reduce endless loops
			for(var i=0;i<enemy.kings.length;i++){
				var piece_tile = this.approachTile(enemy.kings[i].tile,this.moveTiles,"all",true,1);
				if(piece_tile.length > 0){
					return this.findSmallestRisk(piece_tile,[],1);
				}
			}
		}
		
		// 4. Kill enemy or move to safety, if risk is negative. 
		movePiece = null;
		moveTile = null;
		riskValue = 100;
		
		console.log("4. Kill enemy or move to safety");
		
		for(var i = 0;i<this.pieces.length;i++){
			var piece: Piece = this.pieces[i];
			// Makes sure that the piece isn't protecting the king (moving it doesn't put king at risk)
			if(piece.protectsKing){
				continue;
			}
			for(var j=0;j<piece.moveTiles.length;j++){
				let tile: Tile = piece.moveTiles[j];
				let risk = tile.riskValue(piece);
				if(risk < riskValue || (risk==riskValue && Math.random() > 0.4)){ // Some randomisation
					movePiece = piece;
					moveTile = tile;
					riskValue = risk;
				}
			}
		}
		
		
		console.log("4. Risk: ",riskValue,movePiece,moveTile);
		
		// Risk is considered to be worth it if it's negative - the more negative, the better.
		if(riskValue < 0){
			return [movePiece,moveTile];
		}
		
		// 5. Approach king from further (go to tiles from which king could be approached in priority 3., if safe)
		console.log("5. Approach king");
		for(var i=0;i<enemy.kings.length;i++){
			var piece_tile = this.approachTile(enemy.kings[i].tile,this.moveTiles,"all",true,2);
			if(piece_tile.length > 0){
				return this.findSmallestRisk(piece_tile,[],1);
			}
		}
		
		// 6. Move somewhere with a piece that isn't guarding the king
		if(movePiece != null){
			console.log("6. Safe random");
			return [movePiece,moveTile];
		}
		
		// 7. Move to random location with random piece. 
		console.log("7. Random");
		moveTile = randVal(this.moveTiles);
		movePiece = randVal(moveTile[colors]);
		return [movePiece, moveTile];
		
	}
	
}