import { Component, OnInit } from '@angular/core';
import { ChessGameService } from '../chess-game.service';
import { ChessSettingsService } from '../chess-settings.service';

@Component({
    selector: 'chess-game',
    templateUrl: 'chess-game.component.html',
    styleUrls: ['chess-game.component.css']
})
export class ChessGameComponent implements OnInit {

    visibleDialog: string = "";
    
    constructor(public game: ChessGameService, private settings: ChessSettingsService) { }

    ngOnInit() { }

    
    reset(){
        this.game.reset();
    }

    activePlayerColor(){
        let player = this.game.activePlayer;
        if(player == null){
            return "White";
        }else{
            return this.capitalize(player.color);
        }
    }

    capitalize(text: string){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // Opens dialog, if not already open. Otherwise closes it.
    switchDialog(dialogName: string){
        this.visibleDialog = this.visibleDialog == dialogName ? "" : dialogName;
    }

}