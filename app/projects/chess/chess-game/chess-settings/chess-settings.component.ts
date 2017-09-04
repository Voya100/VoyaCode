import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChessSettingsService } from '../../chess-settings.service';
import { ChessGameService } from '../../chess-game.service';

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
  boardReversed: boolean;

  constructor(private settings: ChessSettingsService, private game: ChessGameService){
    this.upperRow = settings.positions[1];
    this.lowerRow = settings.positions[0];
    this.boardReversed = settings.boardReversed;
  }

  saveSettings(){
    this.settings.setPositions(this.upperRow, this.lowerRow);
    if(this.boardReversed !== this.settings.boardReversed){
      this.settings.changeReversed(this.boardReversed);
    }
    this.close.emit();
    this.game.reset();
  }

  resetLayout(){
    this.settings.resetPositions();
    if(this.boardReversed !== this.settings.boardReversed){
      this.settings.changeReversed(this.boardReversed);
    }
    this.close.emit();
    this.game.reset();
  }

}
