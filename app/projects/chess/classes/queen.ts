import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';

export class Queen extends Piece{

  type: string = "queen";
  value: number = 7;

  constructor(player: Player, tile: Tile){
    super(player, tile);
  }
	
  tileCheck(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,7,true));
		this.addTiles();
	}
}