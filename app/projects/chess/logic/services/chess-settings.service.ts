import { Injectable } from '@angular/core';
import { PlayerTypes } from '../chess-enums';

@Injectable()
export class ChessSettingsService {

  readonly boardSize: number = 8;

  positions: string[];
  whitePlayer: PlayerTypes = PlayerTypes.websocket; // Temporary defaults for easier testing
  blackPlayer: PlayerTypes = PlayerTypes.websocket;
  roundLimit: number = 100;

  private readonly defaultPositions: string[] = ['PPPPPPPP', 'RKBQXBKR'];

  constructor() { 
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
        this.whitePlayer = PlayerTypes.websocket;
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
}
