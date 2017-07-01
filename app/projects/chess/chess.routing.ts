import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChessComponent } from './chess.component';
import { ChessBoardComponent } from './chess-game/chess-board/chess-board.component';

const routes: Routes = [
  { path: '', component: ChessComponent, children: [
    { path: '', component: ChessBoardComponent}
  ] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
