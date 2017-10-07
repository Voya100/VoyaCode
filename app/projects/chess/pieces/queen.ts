import { Piece } from './piece';
import { Player } from '../players/player';
import { Tile } from '../tile';
import { PieceState } from '../chess-interfaces';
import { ChessGameService } from '../chess-game.service';

export class Queen extends Piece{

  type: string = 'queen';
  value: number = 7;

  constructor(state: PieceState, game: ChessGameService){
    super(state, game);
  }
  
  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 0, 8, true));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(0, 1, 8, true));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 1, 7, true));
    this.addTiles();
  }
}
