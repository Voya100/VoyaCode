import { Piece } from './piece';
import { Player } from '../players/player';
import { Tile } from '../tile';
import { Rook } from './rook';
import { PieceState } from '../chess-interfaces';
import { ChessGameService } from '../services/chess-game.service';

export class King extends Piece{

  type: string = 'king';
  value: number = 10;

  constructor(state: PieceState, game: ChessGameService){
    super(state, game);
    state.hasMoved = false;
  }
  
  get hasMoved(){ return this.state.hasMoved }
  set hasMoved(hasMoved: boolean){ this.state.hasMoved = hasMoved }

  move(x: number, y: number){
    if(Math.abs(this.x - x) === 2){
      this.castling(x, y);
    }
    super.move(x, y);
    this.hasMoved = true;
  }

  // Moves rook to the correct tile as in castling special move
  // x and y: coordinates the king tries tries to move to
  castling(x: number, y: number){
    const targetTile = this.board[y][x];
    const kingDir = x < this.x ? -1 : 1;
    const tilesInRooksDirection = targetTile.checkDirection(kingDir, 0, 8);
    const rookTile = tilesInRooksDirection[tilesInRooksDirection.length - 1];
    if(rookTile.isEmpty() || rookTile.piece.type !== 'rook'){
      throw new Error('Error: Invalid castling call');
    }else{
      rookTile.piece.move(x - kingDir, y);
    }

  }

  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 0, 1));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(0, 1, 1));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 1, 1));
    this.addTiles();
  }

  // Adds tiles related to castling. Must be done after all other tileChecks have been done
  castlingCheck(rooks: Rook[]){
    // King must not have moved and must not be in check
    if(this.hasMoved || this.threats.length !== 0){
      return;
    }
    for(const rook of rooks){
      const target = this.castlingTargetTile(rook);
      if(this.canDoCastlingWithRook(rook, target)){
        this.moveTiles.push(target);
        target.addMover(this);
      }
    }
  }

  canDoCastlingWithRook(rook: Rook, target: Tile){
    if(rook.hasMoved || rook.y !== this.y || target == null){
      return false;
    }
    const tilesBetween = this.tile.tilesBetween(rook.tile);
    const tilesWithPieces = tilesBetween.filter((tile) => !tile.isEmpty());

    const tilesInKingPath = target.tilesBetween(this.tile);
    tilesInKingPath.push(target);
    const dangerTiles = tilesInKingPath.filter((tile) => tile.getThreats(this.color).length !== 0);
    
    if(tilesWithPieces.length !== 0 || dangerTiles.length !== 0){
      return false;
    }
    return true;
  }

  // Tile to which king will move in castling
  castlingTargetTile(rook: Rook){
    const x = this.x + 2*(rook.x < this.x ? -1 : 1);
    if(!Tile.tileExists(x, this.y)){
      return null;
    }else{
      return this.board[this.y][x]
    }
  }

}
