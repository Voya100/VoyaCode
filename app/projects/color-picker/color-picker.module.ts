import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ColorPickerComponent } from './color-picker.component';
import { ColorCanvasComponent } from './color-canvas/color-canvas.component';

import { ColorSliderComponent } from './sliders/color-slider/color-slider.component';
import { RgbSliderComponent } from './sliders/rgb-slider/rgb-slider.component';
import { HslSliderComponent } from './sliders/hsl-slider/hsl-slider.component';

import { RgbInputComponent } from './inputs/rgb-input/rgb-input.component';
import { HexInputComponent } from './inputs/hex-input/hex-input.component';
import { HslInputComponent } from './inputs/hsl-input/hsl-input.component';

import { ColorService } from './color.service';

import { routing } from './color-picker.routing';

@NgModule({
  imports: [routing, SharedModule, FormsModule],
  exports: [],
  declarations: [
    ColorPickerComponent, ColorCanvasComponent, 
    ColorSliderComponent, RgbSliderComponent, HslSliderComponent,
    RgbInputComponent, HexInputComponent, HslInputComponent
  ],
  providers: [ColorService]
})
export class ColorPickerModule { }
