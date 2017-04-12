import { Injectable } from '@angular/core';

interface RpsPlayerData{
  name: string;
  choice: string;
  score: number;
}

interface RpsStatistics{
  playTimes: number;
  victories: number;
  ties: number;
  losses: number;
}

interface RpsSettings{
  pointsToWin: number;
}

@Injectable()
export class RpsGameLogicService {

  player1: RpsPlayerData;
  player2: RpsPlayerData;
  statistics: RpsStatistics;
  settings: RpsSettings;

  private readonly options: string[] = ["rock", "paper", "scissor"];

  // choicePairs[winningChoice] == losingChoice
  private readonly choicePairs = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  }
  
  constructor() { 
    this.player1 = {name: "Player", choice: "", score: 0};
    this.player2 = {name: "Computer", choice: "", score: 0};
    this.statistics = {playTimes: 0, victories: 0, ties: 0, losses: 0}
  }

  computerChoice(){
    let random = Math.ceil(3*Math.random());
    return this.options[random-1];
  }

  setRoundChoiceForPlayer1(choice: string){
    this.player1.choice = choice;
  }

  setRoundChoiceForPlayer2(choice: string){
    this.player2.choice = choice;
  }

  playRound(){
    let winner = this.getRoundWinner();
    if(winner == null){
      this.player1.score += 0.5;
      this.player2.score += 0.5;
      return null;
    }else{
      winner.score++;
    }
    return winner;
  }

  // Returns winner of the round or null if it's a tie
  getRoundWinner(){
    let choice1 = this.player1.choice;
    let choice2 = this.player2.choice;
    if(choice1 == choice2){
      return null;
    }else if(this.choicePairs[choice1] == choice2){
      return this.player1;
    }else{
      return this.player2;
    }
  }

}