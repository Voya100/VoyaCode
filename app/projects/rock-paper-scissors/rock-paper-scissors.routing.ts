import { RpsMenuComponent } from './rock-paper-scissors-game/rps-menu/rps-menu.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RockPaperScissorsComponent } from './rock-paper-scissors.component';
import { RpsGameAreaComponent } from './rock-paper-scissors-game/rps-game-area/rps-game-area.component';
import { RpsUsernameComponent } from './rock-paper-scissors-game/rps-menu/rps-username/rps-username.component';
import { RpsWinningConditionsComponent } from './rock-paper-scissors-game/rps-menu/rps-winning-conditions/rps-winning-conditions.component';
import { RpsRulesComponent } from './rock-paper-scissors-game/rps-menu/rps-rules/rps-rules.component';
import { RpsStatisticsComponent } from './rock-paper-scissors-game/rps-menu/rps-statistics/rps-statistics.component';

const title = 'Rock, Paper, Scissors'

const routes: Routes = [
  { path: '', component: RockPaperScissorsComponent, children: [
    {path: '', component: RpsMenuComponent, children: [
      {path: 'username', component: RpsUsernameComponent, data: {title}},
      {path: 'winning-conditions', component: RpsWinningConditionsComponent, data: {title}},      
      {path: 'rules', component: RpsRulesComponent, data: {title}},
      {path: 'statistics', component: RpsStatisticsComponent, data: {title}}
    ]},
    {path: 'game', component: RpsGameAreaComponent, data: {title}}
  ] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
