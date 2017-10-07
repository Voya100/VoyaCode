import { Piece } from './piece';
import { Player } from '../players/player';
import { Tile } from '../tile';
import { PieceState } from '../chess-interfaces';
import { ChessGameService } from '../chess-game.service';

export class Pawn extends Piece{

  type: string = 'pawn';
  value: number = 1;
  yDir: number;

  constructor(state: PieceState, game: ChessGameService){
    super(state, game);
    state.hasMoved = false;
    this.yDir = this.isWhite() ? -1 : 1;
  }
  
  get enPassantRound(){ return this.state.enPassantRound }
  set enPassantRound(round: number){ this.state.enPassantRound = round }

  get hasMoved(){ return this.state.hasMoved }
  set hasMoved(hasMoved: boolean){ this.state.hasMoved = hasMoved }

  // Sets moveTiles and hitTiles
  tileCheck(){
    this.clearTiles();
    this.checkVerticalTile(1);
    if(!this.hasMoved){
      this.checkVerticalTile(2);
    }
    this.checkDiagonalTile(1);
    this.checkDiagonalTile(-1);
    this.addTiles();
  }

  // Adds vertical tile to moveTiles/hitTiles, if needed
  checkVerticalTile(distance: number){
    const y = this.y + distance*this.yDir;
    if(!Tile.tileExists(this.x, y)){
      return;
    }
    const tile: Tile = this.board[y][this.x];
    // tslint:disable-next-line:no-shadowed-variable
    if(tile.isEmpty() && tile.tilesBetween(this.tile).filter((tile: Tile) => !tile.isEmpty()).length === 0){
      this.moveTiles.push(tile);
    }
  }

  // Adds diagonal tile to moveTiles/hitTiles, if needed
  checkDiagonalTile(xDir: number){
    const x = this.x
    const y = this.y;
    if(!Tile.tileExists(x+xDir, y+this.yDir)){
      return;
    }
    const	tile = this.board[y+this.yDir][x+xDir];
    const horizontalTile = this.board[y][x+xDir];
    if(tile.isEnemyOf(this) || this.canUseEnPassant(horizontalTile)){
      this.moveTiles.push(tile);
    }
    this.hitTiles.push(tile);
    tile.addHitter(this);
  }

  // True if pawn can use en passant against a piece on tile
  canUseEnPassant(tile: Tile){
    if(tile.isEnemyOf(this) && tile.piece.type === 'pawn'){
      const enemyPawn = <Pawn> tile.piece;
      return enemyPawn.isEnPassantable();
    }
  }

  move(x: number, y: number){
    this.setEnPassantability(y);
    this.tryToDoEnPassant(x, y);
    super.move(x, y);
    this.hasMoved = true;
    // Promotion
    if((y === 0 || y === 7) && this.hasMoved){
      // TODO: delay?
      this.game.removePiece(this.id);
      this.game.addPiece({type: 'queen', x, y, owner: this.color});
    }
  }

  // Tries to do en passant kill when moved to tile in x, y
  tryToDoEnPassant(x: number, y: number){
    const tile = this.game.board[y][x];
    // En passant if movement is diagonal and target tile is empty
    if(x !== this.x && tile.isEmpty()){
      this.game.board[y-this.yDir][x].piece.die();
    }
  }

  // If piece moved 2 tiles, sets enPassantRound to the current round
  setEnPassantability(y: number){
    if(Math.abs(this.y- y) === 2){
      this.enPassantRound = this.game.state.round + (this.isWhite() ? 0 : 1);
    }
  }

  // Checks if enemy can kill the pawn with en passant
  isEnPassantable(){
    return this.enPassantRound === this.game.round;
  }
}
