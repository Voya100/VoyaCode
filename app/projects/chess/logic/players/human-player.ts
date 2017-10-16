import { Player } from './player';
import { ChessGameService } from '../services/chess-game.service';
import { MoveAction } from '../chess-interfaces';
import { Piece } from '../pieces/piece';
import { Tile } from '../tile';

export class HumanPlayer extends Player{

  isPlayable: boolean = true;

  resolveAction: (action: MoveAction) => void;

  constructor(color: string, game: ChessGameService){
    super(color, game);
  }

  // Sets players decision to null (human players choose actions with ui)
  chooseAction(){
    return new Promise<MoveAction>((resolve) => {
      this.resolveAction = <(action: MoveAction) => void> resolve;
    })
  }

  makeAction(piece: Piece, tile: Tile){
    this.resolveAction({piece, tile});
  }
}
