import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColorPickerComponent } from './color-picker.component';

const routes: Routes = [
  { path: '', component: ColorPickerComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
