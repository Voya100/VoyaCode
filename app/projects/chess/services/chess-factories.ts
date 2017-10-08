import { PieceState } from '../chess-interfaces';
import { ChessGameService } from './chess-game.service';

import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Knight } from '../pieces/knight';
import { Pawn } from '../pieces/pawn';
import { Queen } from '../pieces/queen';
import { Rook } from '../pieces/rook';

import { PlayerTypes } from '../chess-enums';
import { ComputerPlayer } from '../players/computer-player';
import { HumanPlayer } from '../players/human-player';

const pieceTypes = {
  bishop: Bishop,
  king: King,
  knight: Knight,
  pawn: Pawn,
  queen: Queen,
  rook: Rook,
  B: Bishop,
  X: King,
  K: Knight,
  P: Pawn,
  Q: Queen,
  R: Rook
}

// Creates piece that matches type, and ensures that piece's type in state matches full type neame
export function createPiece(type: string, state: PieceState, game: ChessGameService){
  const PieceClass = pieceTypes[type];
  if(PieceClass){
    const piece = new PieceClass(state, game);
    state.type = piece.type;
    return piece;
  }
}

export function createPlayer(type: PlayerTypes, color: string, game: ChessGameService){
  switch(type){
    case PlayerTypes.computer:
      return new ComputerPlayer(color, game);
    case PlayerTypes.human:
      return new HumanPlayer(color, game);
    case PlayerTypes.websocket:
      // TODO: make websocket player
      return new HumanPlayer(color, game);
  }
}
