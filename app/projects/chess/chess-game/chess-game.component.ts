import { Component, OnInit } from '@angular/core';
import { ChessGameService } from '../chess-game.service';

@Component({
    selector: 'chess-game',
    templateUrl: 'chess-game.component.html',
    styleUrls: ['chess-game.component.css']
})
export class ChessGameComponent implements OnInit {
    
    constructor(public game: ChessGameService) { }

    ngOnInit() { }

    
    reset(){
        this.game.reset();
    }

    switchGameMode(modeId: number){
        this.game.changeMode(modeId);
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