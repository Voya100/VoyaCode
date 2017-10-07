import { PieceState } from './chess-interfaces';
import { ChessGameService } from './chess-game.service';
import { Bishop } from './classes/bishop';
import { King } from './classes/king';
import { Knight } from './classes/knight';
import { Pawn } from './classes/pawn';
import { Queen } from './classes/queen';
import { Rook } from './classes/rook';
import { PlayerTypes } from './chess-enums';
import { ComputerPlayer } from './classes/computer-player';
import { HumanPlayer } from './classes/human-player';

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
