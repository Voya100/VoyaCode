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
		let x = this.tile.x;
		let y = this.tile.y;
		let dir = this.white ? -1 : 1;
		let tile = this.tiles[y+dir][x];
		
		if(tile.empty()){
			this.moveTiles.push(tile);
		}
		if(0 <= y+2*dir && y+2*dir < 8 && this.yStart == y && tile.empty()){
			tile = this.tiles[y+2*dir][x];
			if(tile.empty()){
				this.moveTiles.push(tile);
			}
		}
		if(x+1 < 8){
			tile = this.tiles[y+dir][x+1];
			if(!tile.isFriend(this) && !tile.empty()){
				this.moveTiles.push(tile);
			}
			this.hitTiles.push(tile);
			tile.addHitter(this);
		}
		if(x-1 >= 0){
			tile = this.tiles[y+dir][x-1];
			if(!tile.isFriend(this) && !tile.empty()){
				this.moveTiles.push(tile);
			}
			this.hitTiles.push(tile);
			tile.addHitter(this);
		}
		this.addTiles();
	}
}