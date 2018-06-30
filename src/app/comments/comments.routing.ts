import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentsComponent } from './comments.component';

const routes: Routes = [
  { path: '', component: CommentsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
