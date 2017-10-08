import { Component, EventEmitter, Output } from '@angular/core';
import { ChessSettingsService } from '../../logic/services/chess-settings.service';
import { ChessGameService } from '../../logic/services/chess-game.service';

@Component({
  selector: 'chess-choose-mode',
  templateUrl: 'chess-choose-mode.component.html',
  styleUrls: ['chess-choose-mode.component.scss']
})
export class ChessChooseModeComponent {

    // Tells the owner to close the component
  @Output() close: EventEmitter<any> = new EventEmitter();
  
  constructor(private settings: ChessSettingsService, private game: ChessGameService){

  }

  switchGameMode(modeId: number){
    this.settings.changeMode(modeId);
    this.close.emit();
    this.game.newGame();
  }
}
