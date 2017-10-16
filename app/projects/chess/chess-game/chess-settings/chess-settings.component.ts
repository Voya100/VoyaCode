import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChessSettingsService } from '../../logic/services/chess-settings.service';
import { ChessGameService } from '../../logic/services/chess-game.service';

@Component({
  selector: 'chess-settings',
  templateUrl: 'chess-settings.component.html',
  styleUrls: ['chess-settings.component.scss']
})
export class ChessSettingsComponent {

    // Tells the owner to close the component
  @Output() close: EventEmitter<any> = new EventEmitter();

  upperRow: string;
  lowerRow: string;

  constructor(private settings: ChessSettingsService, private game: ChessGameService){
    this.upperRow = settings.positions[1];
    this.lowerRow = settings.positions[0];
  }

  saveSettings(){
    this.settings.setPositions(this.upperRow, this.lowerRow);
    this.close.emit();
    this.game.newGame();
  }

  resetLayout(){
    this.settings.resetPositions();
    this.close.emit();
    this.game.newGame();
  }

}
