import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HangmanComponent } from './hangman.component';

const routes: Routes = [
  { path: '', component: HangmanComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);