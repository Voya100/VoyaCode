import { Component } from '@angular/core';
import { RpsGameLogicService, RpsPlayerData } from '../rps-game-logic.service';

@Component({
  selector: 'rock-paper-scissors-game',
  templateUrl: 'rock-paper-scissors-game.component.html',
  styleUrls: ['rock-paper-scissors-game.component.scss']
})
export class RockPaperScissorsGameComponent {
  player: RpsPlayerData;
  computer: RpsPlayerData;

  constructor(gameData: RpsGameLogicService){
    this.player = gameData.player1;
    this.computer = gameData.player2;
  }

}
