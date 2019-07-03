import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MonsterSwarmComponent } from './monster-swarm.component';

const routes: Routes = [{ path: '', component: MonsterSwarmComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
