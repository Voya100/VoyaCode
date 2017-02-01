import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SnowMachineComponent } from './snow-machine.component';

const routes: Routes = [
  { path: '', component: SnowMachineComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);