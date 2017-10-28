import { Component, Input } from '@angular/core';
import { ChessWebsocketService } from '../../../logic/services/chess-websocket.service';
import { Challenge } from '../../../logic/chess-interfaces';

@Component({
  selector: 'chess-challenge-received',
  templateUrl: 'chess-challenge-received.component.html',
  styleUrls: ['chess-challenge-received.component.scss']
})
export class ChessChallengeReceivedComponent {

  @Input() challenge: Challenge;
  
  constructor(private websocket: ChessWebsocketService){
  }

  acceptChallenge(){
    this.websocket.acceptChallenge(this.challenge.username);
  }
  
  declineChallenge(){
    this.websocket.declineChallenge(this.challenge.username);
  }

}
