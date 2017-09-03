import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogsComponent } from './blogs.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: ':id', component: BlogComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
