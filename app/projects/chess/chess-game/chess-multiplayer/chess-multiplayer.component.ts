import { Component, EventEmitter, Output } from '@angular/core';
import { ChessSettingsService } from '../../logic/services/chess-settings.service';
import { ChessGameService } from '../../logic/services/chess-game.service';
import { ChessWebsocketService } from '../../logic/services/chess-websocket.service';
import { Subscription } from 'rxjs/Subscription';
import { Challenge } from '../../logic/chess-interfaces';

@Component({
  selector: 'chess-multiplayer',
  templateUrl: 'chess-multiplayer.component.html',
  styleUrls: ['chess-multiplayer.component.scss']
})
export class ChessMultiplayerComponent {

    // Tells the owner to close the component
  @Output() close: EventEmitter<any> = new EventEmitter();
  
  constructor(private settings: ChessSettingsService, private websocket: ChessWebsocketService){
  }

  get challenge(){
    return this.websocket.challenge;
  }

  get challengeSent(){
    return this.websocket.challengeSent;
  }

}
