import { Component } from '@angular/core';
import { RpsStatistics, RpsGameLogicService } from '../../../rps-game-logic.service';

@Component({
    selector: 'rps-statistics',
    templateUrl: 'rps-statistics.component.html',
    styleUrls: ['rps-statistics.component.css']
})
export class RpsStatisticsComponent {
    statistics: RpsStatistics;
    constructor(gameData: RpsGameLogicService){
        this.statistics = gameData.statistics;
    }
}
