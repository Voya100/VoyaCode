import { Component } from '@angular/core';
import { RpsGameLogicService } from '../rps-game-logic.service';

interface PlayerData{
  score: number;
  name: string;
}

@Component({
  selector: 'rock-paper-scissors-game',
  templateUrl: 'rock-paper-scissors-game.component.html',
  styleUrls: ['rock-paper-scissors-game.component.css']
})
export class RockPaperScissorsGameComponent {
    player: PlayerData;
    computer: PlayerData;

    constructor(gameData: RpsGameLogicService){
      this.player = gameData.player1;
      this.computer = gameData.player2;
    }

}
