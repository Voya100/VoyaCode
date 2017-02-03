import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChessComponent } from './chess.component';

const routes: Routes = [
  { path: '', component: ChessComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);