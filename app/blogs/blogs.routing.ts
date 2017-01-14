import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogsComponent } from './blogs.component';

const routes: Routes = [
  { path: '', component: BlogsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);