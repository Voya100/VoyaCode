import { Component, EventEmitter, Output } from '@angular/core';
import { ChessSettingsService } from '../../logic/services/chess-settings.service';
import { ChessGameService } from '../../logic/services/chess-game.service';
import { ChessWebsocketService } from '../../logic/services/chess-websocket.service';
import { Subscription } from 'rxjs/Subscription';
import { Challenge } from '../../logic/chess-interfaces';

@Component({
  selector: 'chess-lobby',
  templateUrl: 'chess-lobby.component.html',
  styleUrls: ['chess-lobby.component.scss']
})
export class ChessLobbyComponent {

    // Tells the owner to close the component
  @Output() close: EventEmitter<any> = new EventEmitter();

  username: string;
  challengeSent: boolean = false;
  challengeDeclined: boolean = false;
  challengedPlayer: string;
  
  constructor(private settings: ChessSettingsService, private websocket: ChessWebsocketService){
  }

  get challenge(){
    return this.websocket.challenge;
  }

  login(){
    console.log('login pressed');
    this.websocket.joinLobby(this.username);
  }

  isLoggedIn(){
    return this.websocket.isLoggedIn;
  }

  acceptChallenge(){
    this.websocket.acceptChallenge();
  }

  denyChallenge(){
    this.websocket.denyChallenge();
  }

  getUsers(){
    return this.websocket.getUsers();
  }

  challengePlayer(player: string){
    this.resetChallengeStatus();
    this.challengedPlayer = player;
    this.websocket.challengePlayer(player, 60, 100, this.settings.positions[1], this.settings.positions[0]).then(() => {
      this.challengeSent = false;
    }).catch((err) => {
      this.challengeDeclined = true;
    })
  }

  cancelChallenge(){
    this.websocket.cancelChallenge();
    this.resetChallengeStatus();
  }

  resetChallengeStatus(){
    this.challengeSent = true;
    this.challengeDeclined = false;
  }
}
