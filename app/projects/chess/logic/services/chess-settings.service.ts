import { Injectable } from '@angular/core';
import { PlayerTypes } from '../chess-enums';

@Injectable()
export class ChessSettingsService {

  readonly boardSize: number = 8;

  positions: string[];
  whitePlayer: PlayerTypes = PlayerTypes.human;
  blackPlayer: PlayerTypes = PlayerTypes.computer;
  boardReversed: boolean = false;
  roundLimit: number = 100;

  // Contains tile positions on the board interface
  // boardTilePositions[y][x][tile.x, tile.y]
  boardTilePositions: number[][][];

  private readonly defaultPositions: string[] = ['PPPPPPPP', 'RKBQXBKR'];

  constructor() { 
    this.changeReversed(false);
    this.positions = this.defaultPositions;
  }

  // Changes game mode
  changeMode(mode: number){
    switch(mode){
      case 0: // Player vs computer
        this.whitePlayer = PlayerTypes.human;
        this.blackPlayer = PlayerTypes.computer;
        break;
      case 1: // Local multiplayer
        this.whitePlayer = PlayerTypes.human;
        this.blackPlayer = PlayerTypes.human;
        break;
      case 2: // Computer vs computer
        this.whitePlayer = PlayerTypes.computer;
        this.blackPlayer = PlayerTypes.computer;
        break;
      case 3: // Online multiplayer
        this.whitePlayer = PlayerTypes.human;
        this.blackPlayer = PlayerTypes.websocket;
        break;
    }
  }

  setPositions(topRow: string, bottomRow: string){
    this.positions = [bottomRow, topRow];
  }
  
  // Changes piece layout back to default
  resetPositions(){
    this.positions = this.defaultPositions;
  }

  // Sets template for tile positions used by ChessBoardComponent
  changeReversed(reversed: boolean){
    this.boardReversed = reversed;

    if(reversed){
      this.boardTilePositions = Array(this.boardSize).fill(1).map((x, j) => Array(this.boardSize).fill(1).map((_, i) => [j, 7-i]));
    }else{
      this.boardTilePositions = Array(this.boardSize).fill(1).map((x, j) => Array(this.boardSize).fill(1).map((_, i) => [i, j]));
    }
  }
}
