import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

export interface RpsPlayerData{
  name: string;
  choice: string;
  score: number;
}

export interface RpsStatistics{
  playTimes: number;
  victories: number;
  ties: number;
  losses: number;
}

export interface RpsSettings{
  pointsToWin: number;
}

@Injectable()
export class RpsGameLogicService {

  player1: RpsPlayerData;
  player2: RpsPlayerData;
  roundWinner: RpsPlayerData;
  statistics: RpsStatistics;
  settings: RpsSettings;

  private readonly options: string[] = ['rock', 'paper', 'scissors'];

  // choicePairs[winningChoice] == losingChoice
  private readonly choicePairs: any = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper'
  };
  
  constructor(private storage: LocalStorageService) { 
    this.player1 = {name: 'Player', choice: '', score: 0};
    this.player2 = {name: 'Computer', choice: '', score: 0};

    if(storage.get('statistics') == null){
      this.statistics = {playTimes: 0, victories: 0, ties: 0, losses: 0};
      this.settings = {pointsToWin: 3};
      storage.set('statistics', this.statistics);
      storage.set('settings', this.settings);
      storage.set('playerName', this.player1.name);
    }else{
      this.statistics = <RpsStatistics> storage.get('statistics');
      this.settings = <RpsSettings> storage.get('settings');
      this.player1.name = <string> storage.get('playerName');
    }
  }

  computerChoice(){
    const random = Math.ceil(3*Math.random());
    return this.options[random-1];
  }

  playRound(){
    if(this.isTie()){
      this.player1.score += 0.5;
      this.player2.score += 0.5;
    }else{
      this.roundWinner = this.getRoundWinner();
      this.roundWinner.score++;
    }

  }

  // Returns winner of the round or null if it's a tie
  getRoundWinner(){
    const choice1 = this.player1.choice;
    const choice2 = this.player2.choice;
    if(choice1 === choice2){
      return null;
    }else if(this.choicePairs[choice1] === choice2){
      return this.player1;
    }else{
      return this.player2;
    }
  }

  getOpponent(player: RpsPlayerData){
    return player === this.player1 ? this.player2 : this.player1;
  }

  isTie(){
    return this.player1.choice === this.player2.choice;
  }

  gameHasEnded(){
    return this.player1.score >= this.settings.pointsToWin || this.player2.score >= this.settings.pointsToWin;
  }

  getGameWinner(){
    if(this.player1.score === this.player2.score){
      return null;
    }else if(this.player1.score > this.player2.score){
      return this.player1;
    }else{
      return this.player2;
    }
  }

  addGameResultToStatistics(){
    const winner = this.getGameWinner();
    if(winner == null){
      this.statistics.ties++;
    }else if(winner === this.player1){
      this.statistics.victories++;
    }else{
      this.statistics.losses++;
    }
    this.statistics.playTimes++;
    this.storage.set('statistics', this.statistics);
  }

  newGame(){
    this.player1.score = 0;
    this.player2.score = 0;
  }

  setPlayerName(name: string){
    this.player1.name = name;
    this.storage.set('playerName', name);
  }

  setPoinsToWin(points: number){
    if(0 < points && points <= 99){
      this.settings.pointsToWin = points;
      this.storage.set('settings', this.settings);
    }
  }

}
