import { Player } from './player';
import { ChessGameService } from '../chess-game.service';

export class HumanPlayer extends Player{

  constructor(color: string, game: ChessGameService){
    super(color, game);
  }

  // Sets players decision to null (human players choose actions with ui)
  chooseAction(){
    this.setAction([null, null])
  }
}
