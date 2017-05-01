import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChessGameService } from '../../chess-game.service';

@Component({
    selector: 'chess-winner-dialog',
    templateUrl: 'chess-winner-dialog.component.html',
    styleUrls: ['chess-winner-dialog.component.css']
})
export class ChessWinnerDialogComponent implements OnDestroy{
    
    // Tells owner to open another dialog
    @Output() switchDialogEvent = new EventEmitter<string>();

    winnerColor: string;
    
    constructor(public game: ChessGameService){
        let color = game.winner.color;
        this.winnerColor = color[0].toUpperCase() + color.slice(1);
    }

    switchDialog(dialogName: string){
        this.switchDialogEvent.emit(dialogName);
        this.game.winner = null;
    }

    ngOnDestroy(){
        this.game.winner = null;
    }
}
