import { King } from './king';
import { ChessGameService } from '../chess-game.service';
import { Piece } from './piece';
import { Tile } from './tile';
import * as _ from 'underscore';
import { Player } from './player';


function randVal(array: any[]){
	return array[Math.floor(Math.random()*array.length)];
}

export class ComputerPlayer extends Player{
  constructor(color: string, game: ChessGameService){
    super(color, game);
  }

  chooseAction(){
    let target = this.chooseTarget();
    this.pieceDecision = target[0];
    this.tileDecision = target[1];
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