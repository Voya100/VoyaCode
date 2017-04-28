import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChessSettingsService } from '../../chess-settings.service';
import { ChessGameService } from '../../chess-game.service';

@Component({
    selector: 'chess-settings',
    templateUrl: 'chess-settings.component.html',
    styleUrls: ['chess-settings.component.css']
})
export class ChessSettingsComponent {

    // Tells the owner to close the component
    @Output() close = new EventEmitter();

    upperRow: string;
    lowerRow: string;

    constructor(private settings: ChessSettingsService, private game: ChessGameService){
        this.upperRow = settings.positions[0];
        this.lowerRow = settings.positions[1];
    }

    saveSettings(){
        this.settings.positions[0] = this.upperRow;
        this.settings.positions[1] = this.lowerRow;
        this.game.reset();
        this.close.emit();
    }

    resetLayout(){
        this.settings.resetPositions();
        this.game.reset();
        this.close.emit();
    }

}
