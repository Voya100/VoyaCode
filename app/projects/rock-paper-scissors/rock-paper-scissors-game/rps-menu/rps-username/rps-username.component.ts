import { Component } from '@angular/core';
import { RpsGameLogicService, RpsPlayerData } from '../../../rps-game-logic.service';

@Component({
    selector: 'rps-username',
    templateUrl: 'rps-username.component.html',
    styleUrls: ['rps-username.component.css']
})
export class RpsUsernameComponent {

    player: RpsPlayerData;
    name: string;

    constructor(private gameData: RpsGameLogicService){
        this.player = gameData.player1;
        this.name = this.player.name;
    }

    savePlayerName(){
        this.gameData.setPlayerName(this.name);
    }
}
