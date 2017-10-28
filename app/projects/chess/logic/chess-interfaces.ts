import { Piece } from './pieces/piece';
import { Tile } from './tile';

export interface PieceState{
  id?: number,
  type: string,
  owner: string,
  x: number,
  y: number,
  hasMoved?: boolean,
  enPassantRound?: number
}

export interface ChessState{
  pieces: {[key: number]: PieceState},
  round: number,
  activePlayer: string,
  kingCount: number,
  roundLimit: number,
  winner?: string,
  latestMove?: any
}

export interface MoveAction{
  piece: Piece,
  tile: Tile
}

export interface Challenge {
  username: string, 
  timeLimit: number, 
  roundLimit: number, 
  row1: string, 
  row2: string
  isDeclined?: boolean;
};
