import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ColorPickerComponent } from './color-picker.component';
import { routing } from './color-picker.routing';

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [ColorPickerComponent],
  providers: []
})
export class ColorPickerModule { }
