import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OtherProjectsComponent } from './other-projects.component';

const routes: Routes = [
  { path: '', component: OtherProjectsComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
