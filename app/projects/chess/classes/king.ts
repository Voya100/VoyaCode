import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';


export class King extends Piece{

  type: string = "king";
  value: number = 10;

  constructor(player: Player, tile: Tile){
    super(player, tile);
  }
	tileCheck(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,1,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,1,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,1,true));
		this.addTiles();
	}
}