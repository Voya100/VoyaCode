import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';


export class Bishop extends Piece{

  type: string = "bishop";
  value: number = 5;

  constructor(player: Player, tile: Tile){
    super(player, tile);
  }

	tileCheck(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,8,true));
		this.addTiles();
	}
}