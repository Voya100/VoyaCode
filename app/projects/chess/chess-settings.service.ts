import { Injectable } from '@angular/core';

@Injectable()
export class ChessSettingsService {

  private readonly defaultPositions: string[] = ["RKBXQBKR",
	                                              "PPPPPPPP"];

  readonly boardSize: number = 8;

	positions: string[] = this.defaultPositions;
	whiteComputer: boolean = false;
	blackComputer: boolean = true;

  constructor() { }

	// Changes game mode
	changeMode(mode: number){
		switch(mode){
		case 0: // Player vs computer
			this.whiteComputer = false;
			this.blackComputer = true;
			break;
		case 1: // Local multiplayer
			this.whiteComputer = false;
			this.blackComputer = false;
			break;
		case 2: // Computer vs computer
			this.whiteComputer = true;
			this.blackComputer = true;
			break;
		}
	}
  
	// Changes piece layout back to default
	resetPositions(){
    this.positions = this.defaultPositions;
	}
}