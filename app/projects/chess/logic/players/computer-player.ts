import * as _ from 'lodash';

import { ChessGameService } from '../services/chess-game.service';
import { King } from '../pieces/king';
import { Piece } from '../pieces/piece';
import { Player } from './player';
import { Tile } from '../tile';
import { MoveAction } from '../chess-interfaces';

// Returns random value from array
function randVal(array: any[]){
  if(array.length === 0){return array}

  return array[Math.floor(Math.random() * array.length)];
}

export class ComputerPlayer extends Player{

  // Move action that is being considered at the moment - can be turned into piece/tile decision
  moveTile: Tile;
  movePiece: Piece;
  riskValue: number;
  legalMoves: MoveAction[];

  constructor(color: string, game: ChessGameService){
    super(color, game);
  }

  // Sets next action for the player
  chooseAction(): Promise<MoveAction>{
    const promise = super.chooseAction();
    this.chooseTarget();
    this.resolveMove({piece: this.pieceDecision, tile: this.tileDecision}); // resolves promise
    return promise;
    // console.log(this.pieceDecision, this.pieceDecision.tile, this.tileDecision);
  }

  // True, if AI has found its decision
  actionDecided(){
    return this.pieceDecision != null && this.tileDecision != null;
  }

  // Sets the move from piece_tile_risk if it is less risky than current move
  setMove(piece_tile_risk: [Piece, Tile, number]){
    if(piece_tile_risk[2] < this.riskValue){
      this.movePiece = piece_tile_risk[0];
      this.moveTile = piece_tile_risk[1];
      this.riskValue = piece_tile_risk[2];
    }
  }
  
  setAction([piece, tile]: [Piece, Tile]){
    console.log('action', piece.type, ('(' + piece.tile.x + ',' + piece.tile.y + ') => (' + tile.x + ',' + tile.y + ')'))
    this.pieceDecision = piece;
    this.tileDecision = tile;
  }

  // Sets current move as decision
  setMoveToDecision(){
    this.setAction([this.movePiece, this.moveTile]);
  }
  
  // Computer logic, sets pieceDecision and tileDecision
  chooseTarget(){

    this.chooseActionInit();

    const legalMoves = this.legalMoves;
    
    // 1. Kill the enemy king, if possible
    this.tryToKillTheKing();
    if(this.actionDecided()){
      console.log('1. Kill the king');
      return;
    }

    // 2. King is in danger, do best possible move
    if(this.isInCheck()){
      const safeMoves = this.safeKingMoves(this.kings[0]).map((move) => ([move.piece, move.tile]));
      if(safeMoves.length){
        console.log('2. Protect the king')
        this.setAction(this.findSmallestRisk(<[Piece, Tile][]> safeMoves, [], 1));
        return;
      }
    }    

    // 2. Approach the enemy king (hitting distance, if safe)
    this.tryToGetCloseToEnemyKing();
    if(this.actionDecided()){
      console.log('2. Approach enemy king');
      this.kingChaseCount++;
      return;
    }else{
      this.kingChaseCount = 0;
    }
    
    // 3. Kill enemy or move to safety, if risk is negative. 
    this.tryToMakeARisklessMove();
    if(this.actionDecided()){
      console.log('3. Kill enemy or move to safety');
      return;
    }
    
    // 4. Approach king from further (go to tiles from which king could be approached in priority 3., if safe)
    this.tryToApproachEnemyKing(2);
    if(this.actionDecided()){
      console.log('4. Approach king');
      return;
    }
    
    // 5. Move somewhere with a piece that isn't guarding the king (best option from priority 3)
    if(this.movePiece != null){
      console.log('5. Safe random');
      this.setMoveToDecision();
      return;
    }
    
    // 6. Move to random location with random piece. This will likely make the king vulnerable.
    console.log('6. Random');
    this.moveToRandom();
  }

  // Resets variables used by chooseAction
  chooseActionInit(){
    // TODO: Change logic structure to use primarily only 'legal moves'
    this.legalMoves = this.getLegalMoves();
    this.moveTiles = _.uniq(
      _.flatten(this.legalMoves.map((move) => move.tile))
    );
    this.enemy.moveTiles = _.uniq(
      _.flatten(this.enemy.pieces.map((piece) => piece.moveTiles))
    );

    this.pieceDecision = null;
    this.tileDecision = null;
    
    this.moveTile = null;
    this.movePiece = null;
    this.riskValue = 100;
  }

  // Tries to kill enemy king - is always the main priority
  // If multiple kings, first possible choice is selected
  tryToKillTheKing(){
    for(const enemyKing of this.enemy.kings){
      if(enemyKing.threats.length > 0){
        console.log('Can kill the king');
        this.setAction([randVal(enemyKing.threats), enemyKing.tile]);
        return;
      }
    }
  }

  // Tries to move a piece so close to enemy king that it can capture it the next turn
  tryToGetCloseToEnemyKing(){
    if(this.moveCount <= 4 && this.kingChaseCount <= 6){ // To reduce endless loops
      this.tryToApproachEnemyKing(1);
    }
  }

  // Tries to approach an enemy king thinking distance amount of turns ahead (max 2)
  tryToApproachEnemyKing(distance: number){
    for(const enemyKing of this.enemy.kings){
      const piece_tile = this.approachTile(enemyKing.tile, this.moveTiles, 'all', true, distance);
      if(piece_tile.length > 0){
        this.setAction(this.findSmallestRisk(piece_tile, [], 1));
        return;
      }
    }
  }

  // Finds least risky move that won't leave king vulnerable
  tryToMakeARisklessMove(){
    this.movePiece = null;
    this.moveTile = null;
    this.riskValue = 100;

    for(const piece of this.pieces){
      if(piece.moveTiles.length === 0){
        continue;
      }
      const smallestRisk = this.findSmallestRisk([piece], piece.moveTiles);
      if(smallestRisk.length === 3){
        this.setMove(smallestRisk);
      }
    }		
    // console.log("4. Risk: ",this.riskValue,this.movePiece,this.moveTile);
    
    // Risk is considered to be worth it (or 'riskless') if it's negative - the more negative, the better.
    if(this.riskValue < 0){
      this.setAction([this.movePiece, this.moveTile]);
    }
  }

  // Moves a random piece to a completely random tile (will likely put the king at risk)
  moveToRandom(){
    this.moveTile = randVal(this.moveTiles);
    this.movePiece = randVal(this.moveTile.getFriends(this.color));
    this.setMoveToDecision();
  }

  // Goes through array of tiles and pieces and tells which combination is least risky for the piece. 
  // If many with same risk, result is randomized.
  // Returns piece, tile and risk. [piece,tile,risk]
  // Often either pieces or tiles is an array with single value
  // Is used by computer logic
  // Setting 1: pieces is 2-dimensional array: [[piece1,tile1],[piece2,tile2],[piece3,tile3],...], tiles is ignored
  findSmallestRisk(pieces: Piece[]|[Piece, Tile][], tiles: Tile[], setting: number = 0){
    let riskValue = 10000;
    let safest: any = [];
    for(let piece of pieces){
      if(setting === 1){
        tiles = [piece[1]];
        piece = piece[0];
      }
      for(const tile of tiles){
        let risk;
        if(_.findIndex(this.legalMoves, (move) => move.tile === tile && move.piece === piece) === -1){
          // If move isn't legal, it shouldn't be done (TODO: filter these earlier)
          risk = 9999;
        }else{
          risk = tile.riskValue(<Piece> piece);
        }
        if(risk <= riskValue){
          if(risk < riskValue){
            safest = [];
          }
          safest.push([piece, tile, risk])
          riskValue = risk;
        }
      }
    }
    // Return random piece/tile combination, with lowest risk
    return randVal(safest);
  }
  
  // Returns an array of possible piece/tile combinations, which could allow a piece to target tile after "depth" amount of turns (max 2).
  // tile: tile (tile to approach), moveTiles: [tile1, tile2, ...], type: "all", "bishop", "rook", "knight", safe: boolean
  // Return: [[piece1, tile1],[piece2, tile2], ...]
  approachTile(tile: Tile, moveTiles: Tile[], type: string, safe: boolean, depth: number = 1){
    let tiles: Tile[] = [];
    let piece_tile: any[] = []; // piece/tile combinations for approaching
    const player = this;
    if(type === 'all' || type === 'rook'){
      // Horizontal and vertical, rooks and queens
      tiles = tiles.concat(tile.checkDirections(1, 0, 8));
      tiles = tiles.concat(tile.checkDirections(0, 1, 8));
      if(depth === 1){
        tiles = _.intersection(tiles, moveTiles);
      }
      // tslint:disable-next-line:no-shadowed-variable
      tiles = tiles.filter((tile) => !tile.isFriendOf(player));
      piece_tile = this.approachTileLoop(tiles, piece_tile, ['rook', 'queen'], moveTiles, 'rook', safe, depth);
    }
    if(type === 'all' || type === 'bishop'){
      // Diagonal, bishops and queens
      tiles = tile.checkDirections(1, 1, 8);
      if(depth === 1){
        tiles = _.intersection(tiles, this.moveTiles);
      }
      // tslint:disable-next-line:no-shadowed-variable
      tiles = tiles.filter((tile) => !tile.isFriendOf(player))
      piece_tile = this.approachTileLoop(tiles, piece_tile, ['bishop', 'queen'], moveTiles, 'bishop', safe, depth);
    }
    if(type === 'all' || type === 'knight'){
      // Knight
      tiles = tile.checkDirections(2, 1, 1);
      tiles = tiles.concat(tile.checkDirections(1, 2, 1));
      if(depth === 1){
        tiles = _.intersection(tiles, this.moveTiles);
      }
      // tslint:disable-next-line:no-shadowed-variable
      tiles = tiles.filter((tile) => !tile.isFriendOf(player))
      piece_tile = this.approachTileLoop(tiles, piece_tile, ['knight'], moveTiles, 'knight', safe, depth);
    }
    return piece_tile;
  }

  // Helper function for approachTile. Adds appropriate piece/tile combinations to piece_tile array and returns it back
  approachTileLoop(tiles: Tile[], piece_tile: any, types: string[], moveTiles: Tile[], type: string, safe: boolean, depth: number){
    for(const tile of tiles){
      if((safe && tile.getThreatHits(this.color).length > 0)){
        continue;
      }
      if(depth === 2){ // Approach tiles from which could be approached further
        piece_tile = piece_tile.concat(this.approachTile(tile, moveTiles, type, safe, 1));
      }else{
        for(const piece of tile.getFriends(this.color)){
          if(piece === this.prevPiece && this.moveCount > 3){ // To reduce endless loops
            continue;
          }
          if(_.includes(types, piece.type)){
            piece_tile.push([piece, tile]);
          }
        }
      }
    }
    return piece_tile;
  }

}
