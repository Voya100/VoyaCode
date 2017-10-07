import { Piece } from './classes/piece';
import { Tile } from './classes/tile';
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
  winner?: string
}

export interface MoveAction{
  piece: Piece,
  tile: Tile
}
