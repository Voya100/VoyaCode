import { Component, Input } from '@angular/core';
import { ChessWebsocketService } from '../../../logic/services/chess-websocket.service';
import { Challenge } from '../../../logic/chess-interfaces';

@Component({
  selector: 'chess-challenge-sent',
  templateUrl: 'chess-challenge-sent.component.html',
  styleUrls: ['chess-challenge-sent.component.scss']
})
export class ChessChallengeSentComponent {

  @Input() challenge: Challenge;
  
  constructor(private websocket: ChessWebsocketService){
  }

  cancelChallenge(){
    this.websocket.cancelChallenge();
  }

  return(){
    this.websocket.challengeSent = undefined;
  }

}
