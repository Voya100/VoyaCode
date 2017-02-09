import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';

export class Knight extends Piece{

  type: string = "knight";
  value: number = 4;

  constructor(player: Player, tile: Tile){
    super(player, tile);
  }
  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(2,1,1,true));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1,2,1,true));
    this.addTiles();
  }
}