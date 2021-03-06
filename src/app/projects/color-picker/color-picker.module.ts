import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';

import { SharedModule } from '../../shared/shared.module';

import { ColorPickerComponent } from './color-picker.component';

import { ColorCanvasComponent } from './canvases/color-canvas/color-canvas.component';
import { ColorWheelComponent } from './canvases/color-wheel/color-wheel.component';

import { ColorSliderComponent } from './sliders/color-slider/color-slider.component';
import { HslSliderComponent } from './sliders/hsl-slider/hsl-slider.component';
import { RgbSliderComponent } from './sliders/rgb-slider/rgb-slider.component';

import { HexInputComponent } from './inputs/hex-input/hex-input.component';
import { HslInputComponent } from './inputs/hsl-input/hsl-input.component';
import { RgbInputComponent } from './inputs/rgb-input/rgb-input.component';

import { SavedColorsComponent } from './saved-colors/saved-colors.component';

import { ColorService } from './color.service';

import { routing } from './color-picker.routing';

@NgModule({
  imports: [
    routing,
    SharedModule,
    FormsModule,
    CommonModule,
    LocalStorageModule.withConfig({
      prefix: 'color-picker',
      storageType: 'localStorage'
    })
  ],
  exports: [],
  declarations: [
    ColorPickerComponent,
    ColorCanvasComponent,
    ColorWheelComponent,
    ColorSliderComponent,
    RgbSliderComponent,
    HslSliderComponent,
    RgbInputComponent,
    HexInputComponent,
    HslInputComponent,
    SavedColorsComponent
  ],
  providers: [ColorService]
})
export class ColorPickerModule {}
