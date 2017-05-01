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
		let x = this.x();
		let y = this.y();

		this.checkVerticalTile(1);
		if(this.yStart == y){
			this.checkVerticalTile(2);
		}
		this.checkDiagonalTile(1);
		this.checkDiagonalTile(-1);
		this.addTiles();
	}

	// Adds vertical tile to moveTiles/hitTiles, if needed
	checkVerticalTile(distance: number){
		let y = this.y() + distance*this.yDir;
		if(!Tile.tileExists(this.x(), y)){
			return;
		}
		let tile: Tile = this.tiles[y][this.x()];
		if(tile.empty() && tile.tilesBetween(this.tile).filter((tile: Tile) => !tile.empty()).length == 0){
			this.moveTiles.push(tile);
		}
	}

	// Adds diagonal tile to moveTiles/hitTiles, if needed
	checkDiagonalTile(xDir: number){
		let x = this.x();
		let y = this.y();
		if(!Tile.tileExists(x+xDir,y)){
			return;
		}
		let	tile = this.tiles[y+this.yDir][x+xDir];
		let horizontalTile = this.tiles[y][x+xDir];
		if(tile.isEnemyOf(this) || this.canUseEnPassant(horizontalTile)){
			this.moveTiles.push(tile);
		}
		this.hitTiles.push(tile);
		tile.addHitter(this);
	}

	// True if pawn can use en passant against a piece on tile
	canUseEnPassant(tile: Tile){
		if(tile.isEnemyOf(this) && tile.piece.type == 'pawn'){
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
				this.player.game.addPiece(this.x(),this.y(),this.player,"Q");
			}, 500)
		}
	}

	// Tries to do en passant kill when moved to tile in x, y
	tryToDoEnPassant(x: number, y: number){
		let tile = this.player.game.board[y][x];
		// En passant if movement is diagonal and target tile is empty
		if(x != this.x() && tile.empty()){
			this.player.game.board[y-this.yDir][x].piece.die();
		}
	}

	// If piece moved 2 tiles, sets enPassantRound to the current round
	setEnPassantability(y: number){
		if(Math.abs(this.y() - y) == 2){
			this.enPassantRound = this.player.game.round;
		}
	}

	// Checks if enemy can kill the pawn with en passant
	isEnPassantable(){
		return this.enPassantRound == this.player.game.round;
	}
}