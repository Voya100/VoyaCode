import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ColorPickerComponent } from './color-picker.component';
import { ColorCanvasComponent } from './color-canvas/color-canvas.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';
import { RgbInputComponent } from './rgb-input/rgb-input.component';
import { HexInputComponent } from './hex-input/hex-input.component';
import { HslInputComponent } from './hsl-input/hsl-input.component';

import { routing } from './color-picker.routing';

@NgModule({
  imports: [routing, SharedModule, FormsModule],
  exports: [],
  declarations: [
    ColorPickerComponent, ColorCanvasComponent, ColorSliderComponent, 
    RgbInputComponent, HexInputComponent, HslInputComponent
  ],
  providers: []
})
export class ColorPickerModule { }
