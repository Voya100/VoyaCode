import { RockPaperScissorsGameComponent } from './rock-paper-scissors-game/rock-paper-scissors-game.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';

import { SharedModule } from '../../shared/shared.module';

import { routing } from './rock-paper-scissors.routing';

import { RockPaperScissorsComponent }   from './rock-paper-scissors.component';
import { RpsGameAreaComponent } from './rock-paper-scissors-game/rps-game-area/rps-game-area.component';
import { RpsMenuComponent } from './rock-paper-scissors-game/rps-menu/rps-menu.component';
import { RpsUsernameComponent } from './rock-paper-scissors-game/rps-menu/rps-username/rps-username.component';
import { RpsGameLogicService } from './rps-game-logic.service';
import { RpsWinningConditionsComponent } from './rock-paper-scissors-game/rps-menu/rps-winning-conditions/rps-winning-conditions.component';
import { RpsRulesComponent } from './rock-paper-scissors-game/rps-menu/rps-rules/rps-rules.component';
import { RpsStatisticsComponent } from './rock-paper-scissors-game/rps-menu/rps-statistics/rps-statistics.component';


@NgModule({
  imports: [routing, SharedModule, CommonModule, FormsModule, LocalStorageModule.withConfig({
            prefix: 'voyacode-rock-paper-scissors',
            storageType: 'localStorage'
        })],
  exports: [],
  declarations: [RockPaperScissorsComponent, RockPaperScissorsGameComponent, RpsGameAreaComponent, 
                  RpsMenuComponent, RpsUsernameComponent, RpsWinningConditionsComponent, RpsRulesComponent, RpsStatisticsComponent],
  providers: [RpsGameLogicService, LocalStorageService],
})
export class RockPaperScissorsModule { }
