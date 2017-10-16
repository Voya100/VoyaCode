import { animate, Component, OnInit, state, style, transition, trigger } from '@angular/core';
import { ChessGameService } from '../logic/services/chess-game.service';
import { ChessSettingsService } from '../logic/services/chess-settings.service';
import { ChessWebsocketService } from '../logic/services/chess-websocket.service';

@Component({
  selector: 'chess-game',
  templateUrl: 'chess-game.component.html',
  styleUrls: ['chess-game.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('true', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => *', animate('300ms'))
    ])
  ]
})
export class ChessGameComponent {

  visibleDialog: string = '';
  
  constructor(public game: ChessGameService, private settings: ChessSettingsService, private websocket: ChessWebsocketService) {
    this.game.newGame();
  }

  get timer(){
    return this.websocket.getTimer();
  }

  reset(){
    this.visibleDialog = '';
    this.game.newGame();
  }

  activePlayerName(){
    const player = this.game.activePlayer;
    return this.capitalize(player.name);
  }

  capitalize(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Opens dialog, if not already open. Otherwise closes it.
  // Also ensures that game is paused while dialog is open, and continued once closed
  switchDialog(dialogName: string){
    this.visibleDialog = this.visibleDialog === dialogName ? '' : dialogName;
    if(this.visibleDialog === ''){
      this.game.gamePaused = false;
      this.game.run();
    }else{
      this.game.gamePaused = true;
    }
  }

}
