import { Component } from '@angular/core';
import { RpsGameLogicService, RpsSettings } from '../../../rps-game-logic.service';

@Component({
    selector: 'rps-winning-conditions',
    templateUrl: 'rps-winning-conditions.component.html',
    styleUrls: ['rps-winning-conditions.component.css']
})
export class RpsWinningConditionsComponent {

    settings: RpsSettings;
    gameData: RpsGameLogicService;

    constructor(gameData: RpsGameLogicService){
        this.settings = gameData.settings;
        this.gameData = gameData;
    }

    addPoint(){
        this.gameData.setPoinsToWin(this.settings.pointsToWin+1);
    }

    reducePoint(){
        this.gameData.setPoinsToWin(this.settings.pointsToWin-1);
    }
}
