import { King } from './king';
import { ChessGameService } from '../chess-game.service';
import { Piece } from './piece';
import { Tile } from './tile';
import * as _ from 'underscore';
import { Pawn } from './pawn';
import { Knight } from './knight';
import { Bishop } from './bishop';
import { Rook } from './rook';
import { Queen } from './queen';

export abstract class Player{
  color: string;
  game: ChessGameService;
  pieceId: number = 0;
  pieces: Piece[] = [];
  kings: King[] = [];
  queens: Queen[] = [];
  rooks: Rook[] = [];
  bishops: Bishop[] = [];
  knights: Knight[] = [];
  pawns: Pawn[] = [];

  // Tiles the player can move to on their turn
  moveTiles: Tile[] = [];
  // Tiles the player could hit, if there is an enemy piece
  hitTiles: Tile[] = []; 
  // Tile the player moved from last turn
  prevTile: Tile = null; 
  // Piece player moved last turn
  prevPiece: Piece = null; 
  // How many times previous piece has been moved back-to-back
  moveCount: number = 0; 
  kingChaseCount: number = 0;
  activePiece: Piece = null;
  turn: boolean = false;
  enemy: Player = null; // Defined after creation

  pieceDecision: Piece = null;
  tileDecision: Tile = null;

  pieceCount(): number{return this.pieces.length; }
  kingCount(): number{return this.kings.length; }

  constructor(color: string, game: ChessGameService){
    this.color = color;
    this.game = game;
    this.pieceId = 0;
  }

  // Logic which sets the piece and tile decisions (if player is computer)
  abstract chooseAction(): void;

  setAction(pieceAndTile: [Piece, Tile]){
    this.pieceDecision = pieceAndTile[0];
    this.tileDecision = pieceAndTile[1];
  }

  getAction(){
    return [this.pieceDecision, this.tileDecision];
  }

  addPiece(piece: Piece){
    this.pieces.push(piece);
    this[piece.type + 's'].push(piece);
  }
  
  // Looks all possible tiles where pieces can move to
  checkAllTiles(){
    this.moveTiles = [];
    this.hitTiles = [];
    for(let i = 0; i < this.pieceCount(); i++){
      this.pieces[i].tileCheck();
    }
  }
  
  // Sets protectsKing value at the beginning of the turn. Needs to be called after both players have done checkAllTiles().
  findKingProtectors(){
    for(let i = 0; i < this.pieceCount(); i++){
      this.pieces[i].protectsKing = this.pieces[i].tile.protectsKing(this);
    }
  }

  // Looks if player can do castling move. Needs to be called after both players have done checkAllTiles().
  checkCastlingMoves(){
    for(let i = 0; i < this.kingCount(); i++){
      this.kings[i].castlingCheck();
    }
  }
  
}
