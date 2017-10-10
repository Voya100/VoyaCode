import { Piece } from './piece';
import { Player } from '../players/player';
import { Tile } from '../tile';
import { PieceState } from '../chess-interfaces';
import { ChessGameService } from '../services/chess-game.service';

export class Knight extends Piece{

  type: string = 'knight';
  value: number = 4;

  constructor(state: PieceState, game: ChessGameService){
    super(state, game);
  }
  
  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(2, 1, 1));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 2, 1));
    this.addTiles();
  }
}