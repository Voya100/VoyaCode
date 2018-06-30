import { Component } from '@angular/core';

import { RpsGameLogicService, RpsStatistics } from '../../../rps-game-logic.service';

@Component({
  selector: 'rps-statistics',
  templateUrl: 'rps-statistics.component.html',
  styleUrls: ['rps-statistics.component.scss']
})
export class RpsStatisticsComponent {
  statistics: RpsStatistics;
  constructor(gameData: RpsGameLogicService) {
    this.statistics = gameData.statistics;
  }
}
