import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';


export class Pawn extends Piece{

  type: string = "pawn";
  value: number = 1;
  xStart: number;
  yStart: number;

  constructor(player: Player, tile: Tile){
    super(player, tile);
    this.xStart = tile.x;
    this.yStart = tile.y;
  }
	tileCheck(){
		this.clearTiles();
		var x = this.tile.x;
		var y = this.tile.y;
		var dir = this.white ? 1 : -1;
		var tile = this.tiles[x+dir][y];
		
		if(tile.empty()){
			this.moveTiles.push(tile);
		}
		if(0 <= x+2*dir && x+2*dir < 8 && this.xStart == x && tile.empty()){
			tile = this.tiles[x+2*dir][y];
			if(tile.empty()){
				this.moveTiles.push(tile);
			}
		}
		if(y+1 < 8){
			tile = this.tiles[x+dir][y+1];
			if(!tile.isFriend(this) && !tile.empty()){
				this.moveTiles.push(tile);
			}
			this.hitTiles.push(tile);
			tile.addHitter(this);
		}
		if(y-1 >= 0){
			tile = this.tiles[x+dir][y-1];
			if(!tile.isFriend(this) && !tile.empty()){
				this.moveTiles.push(tile);
			}
			this.hitTiles.push(tile);
			tile.addHitter(this);
		}
		this.addTiles();
	}
}