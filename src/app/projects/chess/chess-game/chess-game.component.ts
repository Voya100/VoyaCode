import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChessGameService } from '../chess-game.service';
import { ChessSettingsService } from '../chess-settings.service';

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

  constructor(public game: ChessGameService, private settings: ChessSettingsService) {
    this.game.reset();
  }

  reset() {
    this.visibleDialog = '';
    this.game.reset();
  }

  activePlayerColor() {
    const player = this.game.activePlayer;
    if (player == null) {
      return 'White';
    } else {
      return this.capitalize(player.color);
    }
  }

  capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  // Opens dialog, if not already open. Otherwise closes it.
  // Also ensures that game is paused while dialog is open, and continued once closed
  switchDialog(dialogName: string) {
    this.visibleDialog = this.visibleDialog === dialogName ? '' : dialogName;
    if (this.visibleDialog === '') {
      this.game.gamePaused = false;
      this.game.run();
    } else {
      this.game.gamePaused = true;
    }
  }
}
