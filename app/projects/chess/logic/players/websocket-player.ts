import { EventEmitter, Output } from '@angular/core';

import { Player } from './player';
import { ChessGameService } from '../services/chess-game.service';
import { MoveAction } from '../chess-interfaces';
import { Piece } from '../pieces/piece';
import { Tile } from '../tile';

// WebsocketPlayer's actions are managed by ChessWebsocketService
// Once player tries to make action, service catches player's action event and sends it to server
// Once server responds, websocket will finish the move with resolveAction()

export class WebsocketPlayer extends Player{

  @Output() actionDecision: EventEmitter<MoveAction> = new EventEmitter<MoveAction>();

  resolveAction: (action: MoveAction) => void
  isPlayable: boolean;

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
    this.actionDecision.emit({piece, tile});
  }
}
