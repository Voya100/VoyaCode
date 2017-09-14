import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ColorPickerComponent } from './color-picker.component';
import { ColorCanvasComponent } from './color-canvas/color-canvas.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';

import { routing } from './color-picker.routing';

@NgModule({
  imports: [routing, SharedModule, FormsModule],
  exports: [],
  declarations: [ColorPickerComponent, ColorCanvasComponent, ColorSliderComponent],
  providers: []
})
export class ColorPickerModule { }
