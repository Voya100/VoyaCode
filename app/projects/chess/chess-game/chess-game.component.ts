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

    switchGameMode(modeId: number){
        this.settings.changeMode(modeId);
        this.reset();
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
}