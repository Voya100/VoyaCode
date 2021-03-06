import { Piece } from './piece';
import { Player } from './player';
import { Tile } from './tile';
import { Rook } from './rook';

export class King extends Piece{

  type: string = 'king';
  value: number = 10;
  hasMoved: boolean = false;

  constructor(player: Player, tile: Tile){
    super(player, tile);
  }

  move(x: number, y: number){
    if(Math.abs(this.x() - x) === 2){
      this.castling(x, y);
    }
    super.move(x, y);
    this.hasMoved = true;
  }

  // Moves rook to the correct tile as in castling special move
  // x and y: coordinates the king tries tries to move to
  castling(x: number, y: number){
    const targetTile = this.tiles[y][x];
    const kingDir = x < this.x() ? -1 : 1;
    const tilesInRooksDirection = targetTile.checkDirection(kingDir, 0, 8);
    const rookTile = tilesInRooksDirection[tilesInRooksDirection.length - 1];
    if(rookTile.empty() || rookTile.piece.type !== 'rook'){
      console.log('Error: Invalid castling call');
    }else{
      rookTile.piece.move(x - kingDir, y, false);
    }

  }

  tileCheck(){
    this.clearTiles();
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 0, 1, true));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(0, 1, 1, true));
    this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 1, 1, true));
    this.addTiles();
  }

  // Adds tiles related to castling. Must be done after all other tileChecks have been done
  castlingCheck(){
    // King must not have moved and must not be in check
    if(this.hasMoved || this.threats().length !== 0){
      return;
    }
    for(const rook of this.player.rooks){
      const target = this.castlingTargetTile(rook);
      if(this.canDoCastlingWithRook(rook, target)){
        this.moveTiles.push(target);
        this.player.moveTiles.push(target);
        target.addMover(this);
      }
    }
  }

  canDoCastlingWithRook(rook: Rook, target: Tile){
    if(rook.hasMoved || rook.y() !== this.y() || target == null){
      return false;
    }
    const tilesBetween = target.tilesBetween(this.tile);
    tilesBetween.push(target);
    const tilesWithPieces = tilesBetween.filter((tile: Tile) => !tile.empty());
    const dangerTiles = tilesBetween.filter((tile: Tile) => tile[this.player.enemy.color + 'Hits'].length !== 0);
    if(tilesWithPieces.length !== 0 || dangerTiles.length !== 0){
      return false;
    }
    return true;
  }

  // Tile to which king will move in castling
  castlingTargetTile(rook: Rook){
    const x = this.x() + (rook.x() < this.x() ? -1 : 1) * 2;
    if(!Tile.tileExists(x, this.y())){
      return null;
    }else{
      return this.tiles[this.y()][x];
    }
  }

}
