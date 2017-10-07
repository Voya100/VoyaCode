import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';
import { PieceState } from '../chess-interfaces';
import { ChessGameService } from '../chess-game.service';

export class Rook extends Piece{

  type: string = 'rook';
  value: number = 5;

  constructor(state: PieceState, game: ChessGameService){
    super(state, game);
    state.hasMoved = false;
  }
  
  get hasMoved(){ return this.state.hasMoved }
  set hasMoved(hasMoved: boolean){ this.state.hasMoved = hasMoved }

  move(x: number, y: number){
    super.move(x, y);
    this.hasMoved = true;
  }

  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 0, 8, true));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(0, 1, 8, true));
    this.addTiles();
  }
}
