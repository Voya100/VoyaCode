import { Component, EventEmitter, Output } from '@angular/core';
import { ChessSettingsService } from '../../../logic/services/chess-settings.service';
import { ChessGameService } from '../../../logic/services/chess-game.service';
import { ChessWebsocketService } from '../../../logic/services/chess-websocket.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'chess-lobby',
  templateUrl: 'chess-lobby.component.html',
  styleUrls: ['chess-lobby.component.scss']
})
export class ChessLobbyComponent {

    // Tells the owner to close the component
  @Output() close: EventEmitter<any> = new EventEmitter();

  username: string;
  timeLimit: number = 30;
  roundLimit: number = 150;
  boardType: string = 'standard';
  
  constructor(private settings: ChessSettingsService, private websocket: ChessWebsocketService){
    this.username = websocket.getPlayerName();
  }

  get boardRows(){
    return this.boardType === 'standard' ? this.settings.defaultPositions : this.settings.positions;
  }

  login(){
    console.log('login pressed');
    this.websocket.joinLobby(this.username);
  }

  isLoggedIn(){
    return this.websocket.isLoggedIn;
  }

  getUsers(){
    return this.websocket.getUsers();
  }

  challengePlayer(player: string){
    const row1 = this.boardType === 'standard' ? this.settings.defaultPositions[1] : this.settings.positions[1];
    const row2 = this.boardType === 'standard' ? this.settings.defaultPositions[0] : this.settings.positions[0];
    this.websocket.challengePlayer(player, this.timeLimit, this.roundLimit, row1, row2);
  }
}
