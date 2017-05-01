import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';

export class Rook extends Piece{

  type: string = "rook";
  value: number = 5;
	hasMoved: boolean = false;

  constructor(player: Player, tile: Tile){
    super(player, tile);
  }

	move(x: number, y: number, changeTurn: boolean = true){
		super.move(x, y, changeTurn);
		this.hasMoved = true;
	}

	tileCheck(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,8,true));
		this.addTiles();
	}
}