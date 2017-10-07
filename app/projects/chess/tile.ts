import * as _ from 'underscore';

import { ChessGameService } from './chess-game.service';
import { Pawn } from './pieces/pawn';
import { Piece } from './pieces/piece';
import { Player } from './players/player';

export class Tile{
  x: number;
  y: number;
  game: ChessGameService;
  piece: Piece;

  whites: Piece[] = []; // Whites who can move to the tile
  whiteHits: Piece[] = []; // Whites who could hit the tile, if there was an enemy
  blacks: Piece[] = []; // Blacks who can move to the tile
  blackHits: Piece[] = []; // Blacks who could hit the tile, if there was an enemy

  static tileExists(x: number, y: number): boolean{
    return 0 <= y && y < 8 && 0 <= x && x < 8;
  }
  
  constructor(x: number, y: number, game: ChessGameService){
    this.x = x;
    this.y = y;
    this.game = game;
    this.piece = null;
  }
  
  get board(){ return this.game.board }

  getThreats(color: string){
    return color === 'white' ? this.blacks : this.whites;
  }

  getFriends(color: string){
    return color === 'white' ? this.whites : this.blacks;
  }

  getThreatHits(color: string){
    return color === 'white' ? this.blackHits : this.whiteHits;
  }

  getFriendHits(color: string){
    return color === 'white' ? this.whiteHits : this.blackHits;
  }
  
  // Adds a piece that can move to this tile
  addMover(piece: Piece){
    if(piece.isWhite()){
      this.whites.push(piece);
    }else{
      this.blacks.push(piece);
    }
  }
  // Adds a piece that could hit this tile (if there is an enemy)
  addHitter(piece: Piece){
    if(piece.isWhite()){
      this.whiteHits.push(piece);
    }else{
      this.blackHits.push(piece);
    }
  }
  
  clear(){
    this.whites = [];
    this.whiteHits = [];
    this.blacks = [];
    this.blackHits = [];
  }

  // True if this tile has a piece with same color as piece/player given by parameter
  isFriendOf(pieceOrPlayer: Piece | Player){
    return !this.isEmpty() && this.piece.color === pieceOrPlayer.color; 
  }

  // True if this tile has a piece with different color as piece/player given by parameter
  isEnemyOf(pieceOrPlayer: Piece | Player){
    return !this.isEmpty() && this.piece.color !== pieceOrPlayer.color
  }

  // True if there is a piece on the tile, false otherwise
  isEmpty(){return this.piece === null; } 
  
  setPiece(piece: Piece){
    this.piece = piece;
  }

  removePiece(){
    this.piece = null;
  }
  
  // Tells if piece on this tile is preventing enemy from going to target tile
  // tslint:disable-next-line:cyclomatic-complexity
  protectsTile(targetTile: Tile, pieceOrPlayer: Piece | Player){
    // Doesn't protect if there are pieces between this and the tile
    if(this.tilesBetween(targetTile).filter((tile: Tile) => !tile.isEmpty()).length > 0){
      return false;
    }
    
    const xDir = this.x < targetTile.x ? -1 : 1;
    const yDir = this.y < targetTile.y ? -1 : 1;
    
    if(this.x === targetTile.x){ // They are on same column, threats: rook and queen
      for(let y = this.y+yDir; 0 <= y && y < 8; y += yDir){
        const tile = this.game.board[y][this.x];
        if(tile.isEnemyOf(pieceOrPlayer) && (tile.piece.type === 'rook' || tile.piece.type === 'queen')){
          return true;
        }else if(!tile.isEmpty()){
          break;
        }
      }
    }
    if(this.y === targetTile.y){ // They are on same row, threats: rook and queen
      for(let x = this.x+xDir; 0 <= x && x < 8; x += xDir){
        const tile = this.game.board[this.y][x];
        if(tile.isEnemyOf(pieceOrPlayer) && (tile.piece.type === 'rook' || tile.piece.type === 'queen')){
          return true;
        }else if(!tile.isEmpty()){
          break;
        }
      }
    }
    if(Math.abs(this.y-targetTile.y) === Math.abs(this.x-targetTile.x)){ // They are diagonal, threats: bishop and queen
      for(let x = this.x+xDir, y = this.y+yDir; 0 <= x && x < 8 && 0 <= y && y < 8; x+= xDir, y+= yDir){
        const tile = this.game.board[y][x];
        if(tile.isEnemyOf(pieceOrPlayer)  && (tile.piece.type === 'bishop' || tile.piece.type === 'queen')){
          return true;
        }else if(!tile.isEmpty()){
          break;
        }
      }
    }
    return false;
  }
  
  // Evaluates the risk vs reward of moving the piece to this tile. If risk is negative, it's generally worth doing.
  // tslint:disable-next-line:cyclomatic-complexity
  riskValue(piece: Piece){
    let risk = 0;
    const threats = this.getThreatHits(piece.color); // Enemies who can attack tile
    const friendlies = this.getFriendHits(piece.color); // Player's pieces which can attack the tile, if captured by enemy
    const piecesThreats = piece.threats; // Enemies who can attack piece's current location
    
    // Enemy can hit this tile now, or after moving to it
    if(threats.length > 0 || piece.tile.protectsTile(this, piece)){
      risk += piece.value;
      // Risk is reduced if there are frienly pieces looking over the tile. Doesn't work if piece is more valuable than threats.
      if(threats.length > 0 && friendlies.length > 1 && this.game.lowestTile(threats, false).piece.value >= piece.value){
        risk -= 2;
      }
      if(piece.type === 'king'){
        risk += 100;
      }
    }
    // Risk is reduced if current location is already risky
    if(piecesThreats.length >= 1 && piece.friends.length === 0){
      risk -= piece.value / 2;
    }else if(piecesThreats.length >= 1 && this.game.lowestTile(piecesThreats, false).piece.value < piece.value){
      risk -= piece.value / 3;
    }
    
    // Prevents opening a weak spot, which can't be defended in start of the game
    if(piece.type === 'pawn' 
      && ((piece.color === 'black' && piece.tile.y === 6 && piece.tile.x === 5) 
          || (piece.color === 'white' && piece.tile.y === 1 && piece.tile.x === 2))
      && piece.friends.length === 1){
      risk += 2;
    }
    
    // Risk is reduced if moving kills an enemy (risk vs reward)
    if(this.isEnemyOf(piece)){
      risk -= this.piece.value;
    }
    // Risk is increased, if current tile protects a more valuable tile
    if(piece.value <= 5){
      let valuablePieces: any[];
      if(piece.type === 'pawn'){
        valuablePieces = _.difference(piece.player.pieces, piece.player.pawns);
      }else{
        valuablePieces = _.union(piece.player.queens, piece.player.kings);
      }
      for(const valPiece of valuablePieces){
        // Tile will stay protected if this tile protects the tile
        if(piece.tile.protectsTile(valPiece.tile, piece.player) 
            && valPiece.friends.length === 0 
            && !this.protectsTile(valPiece.tile, piece.player)){
          risk += valPiece.value / 2;
          // King must not be left unprotected
          if(valPiece.type === 'king'){
            risk += 1000;
          }
          break;
        }
      }
    }
    
    // Small prevention to doing same moves again
    if(piece.player.prevTile === this){
      risk += 0.3;
    }
    
    // Small prevention to moving between safe tiles with same piece
    if(piece.player.prevPiece === piece){
      risk += 0.1 * piece.player.moveCount;
    }

    // Encourages promotion near end of the game (when king chase loops are likely)
    if(piece.type === 'pawn'){
      const pawn = <Pawn> piece;
      const promotionY = piece.isWhite() ? 0 : 7;
      const distanceFromPromotion = Math.abs(promotionY - pawn.y);

      if(distanceFromPromotion === 1 && threats.length === 0){
        risk -= 5;
      }else if(piece.player.kingChaseCount > 5){
        risk -= (7 - distanceFromPromotion)*0.3;
      }
    }
    
    // console.log("Risk",piece,this,risk);
    return risk;		
  }
  
  // Returns tiles between the two tiles
  tilesBetween(tile: Tile): Tile[]{
    let x_add = 0;
    let y_add = 0;
    // Checks that they are on same column/row or diagonal
    if(this.x !== tile.x && this.y !== tile.y && Math.abs(this.x-tile.x) !== Math.abs(this.y-tile.y)){
      return [];
    }
    if(this.x !== tile.x){
      x_add = this.x < tile.x ? 1 : -1;
    }
    if(this.y !== tile.y){
      y_add = this.y < tile.y ? 1 : -1;
    }
    const tiles: Tile[] = [];
    for(let x = this.x+x_add, y = this.y+y_add; y !== tile.y || x !== tile.x; x += x_add, y += y_add){
      tiles.push(this.game.board[y][x]);
    }
    return tiles;	
  }
  
  // Checks if tile is between 2 tiles
  isBetween(targetTile: Tile, enemyTile: Tile){
    const x_min = Math.min(targetTile.x, enemyTile.x)
    const x_max = Math.max(targetTile.x, enemyTile.x);
    const y_min = Math.min(targetTile.y, enemyTile.y)
    const y_max = Math.max(targetTile.y, enemyTile.y);
    
    // Same row/column
    if((this.x === targetTile.x && targetTile.x === enemyTile.x && y_min < this.y && this.y < y_max) 
     || this.y === targetTile.y && targetTile.y === enemyTile.y && x_min < this.x && this.x < x_max){
      return true;
    // Diagonal
    }else if(Math.abs(this.x-targetTile.x) === Math.abs(this.y-targetTile.y) 
        && Math.abs(this.x-enemyTile.x) === Math.abs(this.y-enemyTile.y)
        && Math.abs(enemyTile.x-targetTile.x) === Math.abs(enemyTile.y-targetTile.y)){
      return true;
    }else{
      return false;
    }		
  }

  // Checks all 4 directions
  checkDirections(x_add: number, y_add: number, count: number){
    let tiles: Tile[] = [];
    tiles = tiles.concat(this.checkDirection(x_add, y_add, count));
    if(x_add !== 0){
      tiles = tiles.concat(this.checkDirection(-x_add, y_add, count));
    }
    if(y_add !== 0){
      tiles = tiles.concat(this.checkDirection(x_add, -y_add, count));
    }
    if(x_add !== 0 && y_add !== 0){
      tiles = tiles.concat(this.checkDirection(-x_add, -y_add, count));
    }
    return tiles;
  }
  
  // Returns tiles in specific direction, until it meets an obstacle (end of board or piece)
  checkDirection(x_add: number, y_add: number, count: number){
    if(count !== 1){
      count = 8;
    }
    const tiles: Tile[] = [];
    const x = this.x;
    const y = this.y;
    for(let i = 1; i < count+1; i++){
      if(x + x_add*i < 8 && x + x_add*i >= 0 && y + y_add*i < 8 && y + y_add*i >= 0){
        const tile = this.board[y + y_add*i][x + x_add*i];
        tiles.push(tile);
        if(!tile.isEmpty()){
          break;
        }
      }
    }
    return tiles;
  }
}
