import { Component } from '@angular/core';

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

    constructor(){
      this.player = {score: 0, name: "Player"};
      this.computer = {score: 0, name: "Computer"};
    }

}
