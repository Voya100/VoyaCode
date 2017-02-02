import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RockPaperScissorsComponent } from './rock-paper-scissors.component';

const routes: Routes = [
  { path: '', component: RockPaperScissorsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);