import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameAreaComponent } from '../game-area/game-area.component';
import { GameShopComponent } from '../game-shop/game-shop.component';

const routes: Routes = [
  { path: '', component: GameAreaComponent },
  { path: 'shop', component: GameShopComponent },
  { path: 'hiscores', component: undefined }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
