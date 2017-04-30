import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';


export class Pawn extends Piece{

  type: string = "pawn";
  value: number = 1;
  xStart: number;
  yStart: number;
	yDir: number;
	enPassantRound: number;

  constructor(player: Player, tile: Tile){
    super(player, tile);
    this.xStart = tile.x;
    this.yStart = tile.y;
		this.yDir = this.white ? -1 : 1;
  }

	// Sets moveTiles and hitTiles
	tileCheck(){
		this.clearTiles();
		let x = this.tile.x;
		let y = this.tile.y;

		this.checkVerticalTile(1);
		if(this.yStart == y){
			this.checkVerticalTile(2);
		}
		if(x+1 < 8){
			this.checkDiagonalTile(1);
		}
		if(x-1 >= 0){
			this.checkDiagonalTile(-1);
		}
		this.addTiles();
	}

	// Adds vertical tile to moveTiles/hitTiles, if needed
	checkVerticalTile(distance: number){
		let y = this.tile.y + distance*this.yDir;
		if(!Tile.tileExists(this.tile.x, y)){
			return;
		}
		let tile: Tile = this.tiles[y][this.tile.x];
		if(tile.empty() && tile.tilesBetween(this.tile).filter((tile: Tile) => !tile.empty()).length == 0){
			this.moveTiles.push(tile);
		}
	}

	// Adds diagonal tile to moveTiles/hitTiles, if needed
	checkDiagonalTile(xDir: number){
		let x = this.tile.x;
		let y = this.tile.y;
		if(!Tile.tileExists(x,y)){
			return;
		}
		let	tile = this.tiles[y+this.yDir][x+xDir];
		let horizontalTile = this.tiles[y][x+xDir];
		if(tile.isEnemy(this) || this.canUseEnPassant(horizontalTile)){
			this.moveTiles.push(tile);
		}
		this.hitTiles.push(tile);
		tile.addHitter(this);
	}

	// True if pawn can use en passant against a piece on tile
	canUseEnPassant(tile: Tile){
		if(tile.isEnemy(this) && tile.piece.type == 'pawn'){
			let enemyPawn = <Pawn> tile.piece;
			return enemyPawn.isEnPassantable();
		}
	}

	move(x: number, y: number){
		this.setEnPassantability(y);
		this.tryToDoEnPassant(x,y);
		super.move(x, y);
		// Promotion
		if(y == 0 || y == 7){
			setTimeout(() => {
			this.die();
			this.player.game.addPiece(this.tile.x,this.tile.y,this.player,"Q");
			},500)
		}
	}

	// Tries to do en passant kill when moved to tile in x, y
	tryToDoEnPassant(x: number, y: number){
		let tile = this.player.game.board[y][x];
		// En passant if movement is diagonal and target tile is empty
		if(x != this.tile.x && tile.empty()){
			this.player.game.board[y-this.yDir][x].piece.die();
		}
	}

	// If piece moved 2 tiles, sets enPassantRound to the current round
	setEnPassantability(y: number){
		if(Math.abs(this.tile.y - y) == 2){
			this.enPassantRound = this.player.game.round;
		}
	}

	// Checks if enemy can kill the pawn with en passant
	isEnPassantable(){
		return this.enPassantRound == this.player.game.round;
	}
}