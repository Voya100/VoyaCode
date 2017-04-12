import { RpsMenuComponent } from './rock-paper-scissors-game/rps-menu/rps-menu.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RockPaperScissorsComponent } from './rock-paper-scissors.component';
import { RpsGameAreaComponent } from './rock-paper-scissors-game/rps-game-area/rps-game-area.component';

const routes: Routes = [
  { path: '', component: RockPaperScissorsComponent, children: [
    {path: '', component: RpsMenuComponent},
    {path: 'menu', component: RpsMenuComponent},
    {path: 'game', component: RpsGameAreaComponent}    
  ] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);