import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CookiePolicyComponent } from './cookie-policy.component';

const routes: Routes = [
  { path: '', component: CookiePolicyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
