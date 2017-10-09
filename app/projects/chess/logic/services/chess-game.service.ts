import { EventEmitter, Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Tile } from '../tile';
import { Queen } from '../pieces/queen';
import { Piece } from '../pieces/piece';
import { Bishop } from '../pieces/bishop';
import { King } from '../pieces/king';
import { Knight } from '../pieces/knight';
import { Pawn } from '../pieces/pawn';
import { Rook } from '../pieces/rook';

import { ChessSettingsService } from './chess-settings.service';

import { Player } from '../players/player';

import { ChessState, MoveAction, PieceState } from '../chess-interfaces';
import { createPiece, createPlayer } from './chess-factories';

@Injectable()
export class ChessGameService {
  
  board: Tile[][] = [];
  pieces: {[key: string]: Piece}
  whitePlayer: Player;
  blackPlayer: Player;
  gameActive: boolean = false;
  gamePaused: boolean = false;
  turnInProgress: boolean;
  gameId: number = 0;
  idCounter: number = 0;
  state: ChessState;
  latestMove: MoveAction;
  victoryReason: string = '';

  latestMoveChanged: EventEmitter<MoveAction> = new EventEmitter();
  isChecked: EventEmitter<string> = new EventEmitter();

  constructor(private settings: ChessSettingsService) { }

  get round(){ return this.state.round; }
  get activePlayer(){ return this.state.activePlayer === 'white' ? this.whitePlayer : this.blackPlayer }
  get kingCount(){ return this.state.kingCount }
  get winner(){ return this.state.winner }

  get isInteractive(){ return !this.state.winner && this.gameActive && !this.gamePaused && !this.turnInProgress }

  oppositeColor(color: string){
    return color === 'white' ? 'black' : 'white';
  }
  
  newGame(
    row6: string = this.settings.positions[0], 
    row7: string = this.settings.positions[1], 
    roundLimit: number = this.settings.roundLimit
  ){
    this.gameActive = false;
    this.gameId++;

    this.idCounter = 0;

    const state = {
      pieces: {},
      round: 1,
      activePlayer: 'white',
      kingCount: 0,
      roundLimit
    }

    const row6Pieces = row6.split('');
    const row7Pieces = row7.split('');

    state.kingCount = row6Pieces.reduce((prev, type) => type === 'X' ? prev+1 : prev, 0);
    state.kingCount += row7Pieces.reduce((prev, type) => type === 'X' ? prev+1 : prev, 0);

    for(let i = 0; i < 8; i++){
      const row6Type = row6Pieces[i];
      const row7Type = row7Pieces[i];
      if(row7Type && row7Type !== ' '){
        state.pieces[this.idCounter++] = {id: this.idCounter, type: row7Type, x: i, y: 7, owner: 'white'}
        state.pieces[this.idCounter++] = {id: this.idCounter, type: row7Type, x: i, y: 0, owner: 'black'}
      }
      if(row6Type && row6Type !== ' '){
        state.pieces[this.idCounter++] = {id: this.idCounter, type: row6Type, x: i, y: 6, owner: 'white'}
        state.pieces[this.idCounter++] = {id: this.idCounter, type: row6Type, x: i, y: 1, owner: 'black'}
      }
    }
    this.setState(state);
  }
  
  // Builds the game from given state
  setState(state: ChessState){
    this.state = state;
    this.pieces = {};
    this.whitePlayer = createPlayer(this.settings.whitePlayer, 'white', this);
    this.blackPlayer = createPlayer(this.settings.blackPlayer, 'black', this);
    this.whitePlayer.enemy = this.blackPlayer;
    this.blackPlayer.enemy = this.whitePlayer;
    this.fillBoard();
    this.addPieces()
    this.doTileChecks();
    this.gameActive = true;
    this.turnInProgress = false;
    this.victoryReason = '';
    // Small delay so that ui has time to add pieces before computer starts its moves
    setTimeout(() => this.run(), 400);
  }

  // Makes empty tiles for the board
  fillBoard(){
    this.board = _.times(8, (j) => _.times(8, (i) => new Tile(i, j, this)));
  }
  
  addPieces(){
    const state = this.state;
    for(const id in state.pieces){
      if (state.pieces.hasOwnProperty(id)) {
        this.addPiece(state.pieces[id]);
      }
    }
  }
  
  // Adds piece to the board
  addPiece(pieceState: PieceState){
    if(pieceState.id === undefined){
      pieceState.id = this.idCounter++;
    }
    const piece = createPiece(pieceState.type, pieceState, this);
    if(piece === undefined){
      throw new Error('Invalid piece type: ' + pieceState.type);
    }
    this.pieces[pieceState.id] = piece;
    this.board[pieceState.y][pieceState.x].piece = piece;
    this[piece.color + 'Player'].addPiece(piece);
  }
  
  removePiece(id: number){
    const piece = this.pieces[id];
    this.state.pieces[id] = undefined;
    const player = piece.isWhite() ? this.whitePlayer : this.blackPlayer;
    player.removePiece(piece);
  }

  getPiece(x: number, y: number){
    return this.board[y][x].piece;
  }

  doTileChecks(){
    this.clearTiles();
    // Looks all possible moves
    this.whitePlayer.checkAllTiles();
    this.blackPlayer.checkAllTiles();
    // Looks all possible castling moves
    this.whitePlayer.checkCastlingMoves();
    this.blackPlayer.checkCastlingMoves();
  }
  
  // Removes move information from all tiles (done before adding new move information)
  clearTiles(){
    this.board.forEach((row) => row.forEach((tile) => tile.clear()));
  }
  
  // Plays a round, if possible (player must be computer)
  run(){
    if(this.gameActive && !this.turnInProgress && !this.gamePaused && !this.winner){
      this.activePlayer.chooseAction().then(({piece, tile}) => {
        this.movePiece(piece, tile);
        this.latestMove = {piece, tile};
        this.latestMoveChanged.emit(this.latestMove);
        const gameId = this.gameId;
        this.turnInProgress = true;
        // Timeout to give some time for animations
        this.changeTurn();
        setTimeout(() => gameId === this.gameId ? this.run() : 0, 650);
      });
    }
  }

  movePiece(piece: Piece, target: Tile){
    if(!piece.canMove(target)){
      throw new Error('invalid-move');
    }
    piece.move(target.x, target.y);
  }
  
  checkIfGameHasEnded(){
    if(this.state.round > this.state.roundLimit){
      this.state.winner = 'tie';
      this.victoryReason = 'max-rounds';
    }else if(this.activePlayer.legalMoves.length === 0){
      if(this.activePlayer.isInCheckMate()){
        this.state.winner = this.oppositeColor(this.activePlayer.color);
        this.victoryReason = 'check-mate';
      }else{
        this.state.winner = 'tie';
        this.victoryReason = 'stalemate';
      }
    }else if(this.kingCount && this.activePlayer.kingCount === 0){
      this.state.winner = this.oppositeColor(this.activePlayer.color);
    }
    if(this.state.winner){
      this.gameActive = false;
    }else if(this.activePlayer.isInCheck()){
      // Small delay for check message
      this.isChecked.emit(this.oppositeColor(this.activePlayer.color));      
    }
  }
  
  changeTurn(){
    this.state.activePlayer = this.state.activePlayer === 'white' ? 'black' : 'white';
    if(this.state.activePlayer === 'white'){
      this.state.round++;
    }
    this.doTileChecks();
    this.checkIfGameHasEnded();
    this.turnInProgress = false;
  }
  
  // Returns the tile that has a piece with lowest value
  lowestTile(tilesOrPieces: any[], isTile: boolean){
    let lowest = 100;
    let lowestTile = tilesOrPieces[0];
    const tiles = isTile ? tilesOrPieces : tilesOrPieces.map((piece: Piece) => piece.tile);
    for(const tile of tiles){
      if(!tile.isEmpty() && tile.piece.value < lowest){
        lowest = tile.piece.value;
        lowestTile = tile;
      }
    }
    return lowestTile;
  }
  
}
