import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';
import { PieceState } from '../chess-interfaces';
import { ChessGameService } from '../chess-game.service';

export class Bishop extends Piece{

  type: string = 'bishop';
  value: number = 5;

  constructor(state: PieceState, game: ChessGameService){
    super(state, game);
  }

  // Moves diagonally
  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 1, 8, true));
    this.addTiles();
  }
}
