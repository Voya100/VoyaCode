import { King } from './king';
import { ChessGameService } from '../chess-game.service';
import { Piece } from './piece';
import { Tile } from './tile';
import * as _ from 'underscore';

export abstract class Player{
	computer: boolean;
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

	pieceDecision: Piece = null;
	tileDecision: Tile = null;

  constructor(color: string, game: ChessGameService){
      this.color = color;
      this.game = game;
      this.pieceId = 0;
  }

	// Logic which sets the action
	abstract chooseAction(): void;

	setAction(piece: Piece, tile: Tile){
		this.pieceDecision = piece;
		this.tileDecision = tile;
	}

	getAction(){
		return [this.pieceDecision, this.tileDecision];
	}

	addPiece(piece: Piece){
		this.pieces.push(piece);
		this[piece.type + "s"].push(piece);
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
	
	
}