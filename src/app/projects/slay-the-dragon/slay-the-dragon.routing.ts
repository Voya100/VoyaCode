import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SlayTheDragonComponent } from './slay-the-dragon.component';

const routes: Routes = [{ path: '', component: SlayTheDragonComponent }];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
