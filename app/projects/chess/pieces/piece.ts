import * as _ from 'underscore';

import { Player } from '../players/player';
import { Tile } from '../tile';
import { PieceState } from '../chess-interfaces';
import { ChessGameService } from '../chess-game.service';

export abstract class Piece{
  id: number;
  state: PieceState;
  game: ChessGameService;
  
  // Tiles piece can move to on the next turn
  moveTiles: Tile[] = [];
  // Tiles piece could go to, if enemy is there
  hitTiles: Tile[] = [];

  dead: boolean = false;
  
  abstract value: number; 
  abstract type: string;

  tiles: Tile[][];

  constructor(state: PieceState, game: ChessGameService){
    this.id = state.id;
    this.state = state;
    this.game = game;
  }
  
  get color(){ return this.state.owner }
  get x(){ return this.state.x }
  get y(){ return this.state.y }
  get board(){ return this.game.board }
  get tile(){ return this.board[this.y][this.x] }
  set tile(tile: Tile){ this.state.x = tile.x; this.state.y = tile.y; }
  get player(){ return this.game[this.color + 'Player']; }

  // Returns friendlies which can move to the tile after death	
  get friends(){ return this.tile.getFriendHits(this.color) }
  // Returns enemies that can hit the next turn
  get threats(){ return this.tile.getThreatHits(this.color) }
  
  // Adds move and hit tiles (determines which tiles the piece can move to)
  abstract tileCheck(): void;

  protectsPiece(piece: Piece){ return this.tile.protectsTile(piece.tile, this) }

  isWhite(){ return this.color === 'white' }

  move(x: number, y: number){
    this.tile.piece = null;
    this.tile = this.game.board[y][x];
    if(!this.tile.isEmpty()){
      this.tile.piece.die();
    }
    this.tile.piece = this;
  }

  canMove(tile: Tile){return this.moveTiles.indexOf(tile) !== -1; }
  
  // Checks all 4 directions
  checkDirections(x_add: number, y_add: number, count: number, roundStart: boolean){
    let moveTiles: Tile[] = [];
    moveTiles = moveTiles.concat(this.checkDirection(x_add, y_add, count, roundStart));
    if(x_add !== 0){
      moveTiles = moveTiles.concat(this.checkDirection(-x_add, y_add, count, roundStart));
    }
    if(y_add !== 0){
      moveTiles = moveTiles.concat(this.checkDirection(x_add, -y_add, count, roundStart));
    }
    if(x_add !== 0 && y_add !== 0){
      moveTiles = moveTiles.concat(this.checkDirection(-x_add, -y_add, count, roundStart));
    }
    return moveTiles;
  }

  // Adds tiles in 1 direction to hit/move tiles until an obstacle comes along
  checkDirection(x_add: number, y_add: number, count: number, roundStart: boolean): Tile[]{
    let moveTiles = this.tile.checkDirection(x_add, y_add, count);

    for(const target of moveTiles){
      this.hitTiles.push(target);
      target.addHitter(this);
      if(target.isFriendOf(this)){
        moveTiles = _.without(moveTiles, target);
      }
    }
    return moveTiles;
  }

  // Removes information of piece's current possible move locations from player/tiles. Done before checking them again.
  clearTiles(){
    this.moveTiles = [];
    this.hitTiles = [];
  }

  // Adds piece's possible move locations to player and tiles
  addTiles(){
    for(const tile of this.moveTiles){
      tile.addMover(this);
    }
  }

  die(){
    this.tile.removePiece();
    this.game.removePiece(this.id);
  }
}
