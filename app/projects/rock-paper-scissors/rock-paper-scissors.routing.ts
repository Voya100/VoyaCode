import { RpsMenuComponent } from './rock-paper-scissors-game/rps-menu/rps-menu.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RockPaperScissorsComponent } from './rock-paper-scissors.component';
import { RpsGameAreaComponent } from './rock-paper-scissors-game/rps-game-area/rps-game-area.component';
import { RpsUsernameComponent } from './rock-paper-scissors-game/rps-menu/rps-username/rps-username.component';

let title = "Rock, Paper, Scissors"

const routes: Routes = [
  { path: '', component: RockPaperScissorsComponent, children: [
    {path: '', component: RpsMenuComponent, children: [
      {path: 'username', component: RpsUsernameComponent, data:{title: title}},
    ]},
    {path: 'game', component: RpsGameAreaComponent, data:{title: title}}
  ] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);