import * as _ from 'lodash';

import { ChessGameService } from '../services/chess-game.service';
import { Tile } from '../tile';

import { Piece } from '../pieces/piece';
import { King } from '../pieces/king';
import { Pawn } from '../pieces/pawn';
import { Knight } from '../pieces/knight';
import { Bishop } from '../pieces/bishop';
import { Rook } from '../pieces/rook';
import { Queen } from '../pieces/queen';

import { MoveAction } from '../chess-interfaces';

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

  resolveMove: (moveAction: MoveAction) => void

  pieceDecision: Piece = null;
  tileDecision: Tile = null;

  get kingCount(){ return this.kings.length; }
  get pieceCount(){ return this.pieces.length; }

  get legalMoves(){
    if(!this.isInCheck()){
      if(this.kingCount !== 1){
        return this.allMoves;
      }
      const king = this.kings[0];
      return this.allMoves.filter(({piece, tile}) => {
        if(piece === king){
          return !tile.getThreatHits(this.color).length;
        }else if(piece.protectsPiece(king)){
          // Piece is between threat and king
          const xDir = Math.sign(piece.x - king.x);
          const yDir = Math.sign(piece.y - king.y);
          const oppositeTiles = piece.tile.checkDirection(xDir, yDir, 8);
          const threatTile = oppositeTiles[oppositeTiles.length - 1];
          return tile.isBetween(king.tile, threatTile) || tile === threatTile;
        }
        return true;
      })
    }else{
      return this.safeKingMoves(this.kings[0]);
    }
  }

  get allMoves(){
    const moves: {piece: Piece, tile: Tile}[] = [];
    // Note: Moves may not be safe for the king
    this.pieces.forEach((piece) => {
      piece.moveTiles.forEach((tile) => {
        moves.push({piece, tile});
      });
    });
    return moves;
  }

  constructor(color: string, game: ChessGameService){
    this.color = color;
    this.game = game;
    this.pieceId = 0;
  }

  // Logic which sets the piece and tile decisions (if player is computer)
  chooseAction(): Promise<MoveAction>{
    return new Promise((resolve) => {
      this.resolveMove = <(moveAction: MoveAction) => void> resolve;
    }).then((action: MoveAction) => {
      this.prevTile = action.tile;
      if(this.prevPiece !== action.piece){
        this.moveCount = 0;
      }
      this.prevPiece = action.piece;
      this.moveCount++;
      return action;
    })
  };

  addPiece(piece: Piece){
    this.pieces.push(piece);
    this[piece.type + 's'].push(piece);
  }
  
  removePiece(piece: Piece){
    this.pieces = _.without(this.pieces, piece);
    const types = piece.type + 's';
    this[types] = _.without(this[types], piece);
  }

  isInCheck(){
    if(this.kingCount === 0){
      return false;
    }
    const king = this.kings[0];
    return !!king.threats.length;
  }

  isInCheckMate(){
    return this.isInCheck() && this.safeKingMoves(this.kings[0]).length === 0;
  }

  safeKingMoves(king: King){
    const threats = king.threats;

    const dodgeMoves = this.dodgeMoves(king);
    if(threats.length !== 1){return dodgeMoves; }

    const threat = king.threats[0];
    const threatKillMoves = this.threatKillMoves(threat, king);
    const threatBlockMoves = this.threatBlockMoves(threat, king);
    return [...dodgeMoves, ...threatKillMoves, ...threatBlockMoves];
  }

  dodgeMoves(piece: Piece){
    const threats = piece.threats;
    const safeTiles = piece.moveTiles.filter((tile) => {
      return tile.getThreatHits(this.color).length === 0 && _.every(threats, (threat) => {
        return !piece.tile.isBetween(tile, threat.tile) || tile === threat.tile;
      });
    });
    return safeTiles.map((tile) => ({piece, tile}));
  }

  // Moves that can be used to kill threat, without leaving the king vulnerable
  threatKillMoves(threat: Piece, king: King){
    const movePieces = threat.threats.filter((piece) => {
      const leavesKingVulnerable = piece.protectsPiece(king) && !piece.tile.isBetween(king.tile, threat.tile);
      const risksKing = piece === king && threat.friends.length > 0;
      return !leavesKingVulnerable && !risksKing;
    });
    return movePieces.map((piece) => ({piece, tile: threat.tile}));
  }

  // Moves that can be used to block a threat, without leaving king vulnerable
  threatBlockMoves(threat: Piece, pieceToProtect: Piece){
    // Knights can't be blocked
    if(threat.type === 'knight'){return []; }

    const moves = [];
    const tilesBetween = pieceToProtect.tile.tilesBetween(threat.tile);

    for(const tile of tilesBetween){
      const pieces = tile.getFriends(this.color).filter((piece) => {
        return !piece.protectsPiece(pieceToProtect) && piece !== pieceToProtect;
      });
      for(const piece of pieces){
        moves.push({piece, tile});
      }
    }
    return moves;
  }
  
  // Looks all possible tiles where pieces can move to
  checkAllTiles(){
    this.moveTiles = [];
    this.hitTiles = [];
    for(let i = 0; i < this.pieceCount; i++){
      this.pieces[i].tileCheck();
    }
  }

  // Looks if player can do castling move. Needs to be called after both players have done checkAllTiles().
  checkCastlingMoves(){
    for(let i = 0; i < this.kingCount; i++){
      this.kings[i].castlingCheck(this.rooks);
    }
  }

}
