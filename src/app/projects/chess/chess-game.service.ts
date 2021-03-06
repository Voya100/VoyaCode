import { Injectable } from '@angular/core';

import { Player } from './classes/player';
import { Tile } from './classes/tile';
import { Piece } from './classes/piece';
import { Bishop } from './classes/bishop';
import { King } from './classes/king';
import { Knight } from './classes/knight';
import { Pawn } from './classes/pawn';
import { Queen } from './classes/queen';
import { Rook } from './classes/rook';
import { ChessSettingsService } from './chess-settings.service';
import { HumanPlayer } from './classes/human-player';
import { ComputerPlayer } from './classes/computer-player';

@Injectable()
export class ChessGameService {
  
  // Properties, are set in reset
  board: Tile[][] = [];
  white: Player;
  black: Player;
  gameActive: boolean = false;
  gamePaused: boolean = false;
  turn: boolean;
  round: number;
  gameId: number = 0;
  activePlayer: Player;
  winner: Player;

  constructor(private settings: ChessSettingsService) { }
  
  reset(){
    this.gameActive = false;
    
    this.gameId++;
    
    this.board = [];
    
    this.white = this.settings.whiteComputer ? new ComputerPlayer('white', this) : new HumanPlayer('white', this);
    this.black = this.settings.blackComputer ? new ComputerPlayer('black', this) : new HumanPlayer('black', this);
    
    this.white.enemy = this.black;
    this.black.enemy = this.white;
    
    this.activePlayer = this.white;
    this.winner = null;

    this.round = 1;
    this.setUp();
    this.gameActive = true;
    this.turn = true;
    // Small delay so that ui has time to add pieces before computer starts its moves
    setTimeout(() => this.run(), 500);
  }
  
  // Sets the board and adds all the pieces
  setUp(){
    this.fillBoard();
    this.addPieces();
    this.doTileChecks();
    this.turn = true;
  }

  // Makes empty tiles for the board
  fillBoard(){
    this.board = [];
    for(let j = 0; j < 8; j++){
      this.board[j] = [];
      for(let i = 0; i < 8; i++){
        this.board[j][i] = new Tile(i, j, this);
      }
    }
  }
  
  addPieces(){
    const row1 = this.settings.positions[0] + '_'.repeat(8-this.settings.positions[0].length);
    const row2 = this.settings.positions[1] + '_'.repeat(8-this.settings.positions[1].length);
    for(let i = 0; i < 8; i++){
      this.addPiece(i, 7, this.white, row1[i]);
      this.addPiece(i, 0, this.black, row1[i]);
      this.addPiece(i, 6, this.white, row2[i]);
      this.addPiece(i, 1, this.black, row2[i]);
    }
  }
  
  // Adds piece to the board
  addPiece(x: number, y: number, player: Player, type: string){
    let piece: Piece;
    const tile = this.board[y][x];
    player.pieceId++;
    switch(type){
      case 'P':
        piece = new Pawn(player, tile);
        break;
      case 'R':
        piece = new Rook(player, tile);
        break;
      case 'B':
        piece = new Bishop(player, tile);
        break;
      case 'K':
        piece = new Knight(player, tile);
        break;
      case 'Q':
        piece = new Queen(player, tile);
        break;
      case 'X':
        piece = new King(player, tile);
        break;		
      default:
        piece = null;
        return;
    }
    player.addPiece(piece);
    this.board[y][x].piece = piece;
    const id = player.color + player.pieceId;
  }

  doTileChecks(){
    this.clearTiles();
    // Looks all possible moves
    this.white.checkAllTiles();
    this.black.checkAllTiles();
    // Looks all possible castling moves
    this.white.checkCastlingMoves();
    this.black.checkCastlingMoves();
    // Checks which pieces are protecting their kings (used by AI)
    this.white.findKingProtectors();
    this.black.findKingProtectors();
  }
  
  // Removes move information from all tiles (done before adding new move information)
  clearTiles(){
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        this.board[i][j].clear();
      }
    }
  }
  
  // Plays a round, if possible (player must be computer)
  run(){
    if(this.gameActive && this.turn && !this.gamePaused){
      this.activePlayer.chooseAction();
      const choice = this.activePlayer.getAction();
      this.makeTurn(choice[0], choice[1]);
    }
  }

  // Makes a turn, if action has been decided 
  // (is used only by computer to simulate player's clicks)
  makeTurn(piece: any, tile: any){
    if(piece == null || tile == null){
      return;
    }
    piece.tile.select(this.activePlayer);
    tile.select(this.activePlayer);
  }
  
  gameOver(loser: Player){
    this.winner = loser.enemy;
    this.gameActive = false;
  }
  
  // Changes turn and does situation checks once a turn has ended
  changeTurn(gameId: number){
    if(gameId === this.gameId){ // Make sure the game hasn't been reset
      this.doTileChecks();
      this.activePlayer = this.activePlayer.enemy;
      if(this.activePlayer.color === 'white'){
        this.round += 1;
      }
      if(this.activePlayer.moveTiles.length === 0){
        this.gameOver(this.activePlayer);
        return;
      }
      this.turn = true;
      this.run();
    }
  }
  
  // Returns the tile that has a piece with lowest value
  lowestTile(tilesOrPieces: any[], isTile: boolean){
    let lowest = 100;
    let tile = tilesOrPieces[0];
    const tiles = isTile ? tilesOrPieces : tilesOrPieces.map((piece: Piece) => piece.tile);
    for(let i = 0; i < tiles.length; i++){
      if(!tiles[i].empty() && tiles[i].piece.value < lowest){
        lowest = tiles[i].piece.value;
        tile = tiles[i];
      }
    }
    return tile;
  }
  
}
