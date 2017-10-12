import { Component, EventEmitter, Output } from '@angular/core';
import { ChessSettingsService } from '../../logic/services/chess-settings.service';
import { ChessGameService } from '../../logic/services/chess-game.service';
import { ChessWebsocketService } from '../../logic/services/chess-websocket.service';

@Component({
  selector: 'chess-lobby',
  templateUrl: 'chess-lobby.component.html',
  styleUrls: ['chess-lobby.component.scss']
})
export class ChessLobbyComponent {

    // Tells the owner to close the component
  @Output() close: EventEmitter<any> = new EventEmitter();

  username: string;
  
  constructor(private settings: ChessSettingsService, private websocket: ChessWebsocketService){

  }

  login(){
    this.websocket.joinLobby(this.username);
  }

  isLoggedIn(){
    return this.websocket.isLoggedIn;
  }

  getUsers(){
    return this.websocket.getUsers();
  }
}
