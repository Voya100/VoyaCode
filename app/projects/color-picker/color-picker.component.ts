import { Component } from '@angular/core';
import { colorChannel, hslChannel } from './enums';
import { ColorService } from './color.service';

@Component({
  templateUrl: 'color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  zChannel: colorChannel = colorChannel.B;

  redColor: colorChannel = colorChannel.R;
  greenColor: colorChannel = colorChannel.G;
  blueColor: colorChannel = colorChannel.B;

  hueChannel: hslChannel = hslChannel.H;
  saturationChannel: hslChannel = hslChannel.S;
  lightnessChannel: hslChannel = hslChannel.L;

  rgbSliderAllChannels: boolean = false;

  showColorWheel: boolean = false;

  _red: number = 37;
  _green: number = 134;
  _blue: number = 204;

  hue: number;
  saturation: number;
  lightness: number;

  // [x, y, z] color axes for zAxis's color channel key (options: RGB, BRG, GBR)
  private axes: { [key: string]: colorChannel[] } = {
    [colorChannel.R]: [colorChannel.G, colorChannel.B, colorChannel.R],
    [colorChannel.G]: [colorChannel.B, colorChannel.R, colorChannel.G],
    [colorChannel.B]: [colorChannel.R, colorChannel.G, colorChannel.B]
  };

  constructor(private colorService: ColorService) {
    this.updateHsl();
  }
  
  updateRgb(){
    [this.red, this.green, this.blue] = this.colorService.hslToRgb([this.hue, this.saturation, this.lightness]);
  }

  updateHsl(){
    [this.hue, this.saturation, this.lightness] = this.colorService.rgbToHsl([this.red, this.green, this.blue]);
  }

  get red(){
    return this._red;
  }
  set red(value: number){
    this._red = this.roundColorValue(value);
  }
  
  get green(){
    return this._green;
  }
  set green(value: number){
    this._green = this.roundColorValue(value);
  }
  
  get blue(){
    return this._blue;
  }
  set blue(value: number){
    this._blue = this.roundColorValue(value);
  }

  roundColorValue(value: number){
    return Math.round(Math.max(0, Math.min(value, 255)));
  }

  get xChannel(){
    return this.axes[this.zChannel][0];
  }

  get yChannel(){
    return this.axes[this.zChannel][1];
  }

  getCoordinate(color: colorChannel){
    if(this.showColorWheel){ return undefined; }
    const index = this.axes[this.zChannel].indexOf(color);
    return ['x', 'y', 'z'][index];
  }

  changeRed(redValue: number){
    this.red = redValue;
    this.updateHsl();
  }
  
  changeGreen(greenValue: number){
    this.green = greenValue;
    this.updateHsl();
  }

  changeBlue(blueValue: number){
    this.blue = blueValue;
    this.updateHsl();
  }

  selectColor([red, green, blue]: number[]){
    [this.red, this.green, this.blue] = [red, green, blue];
    this.updateHsl();
  }

  changeHue(value: number){
    this.hue = value;
    this.updateRgb();
  }

  changeSaturation(value: number){
    this.saturation = value;
    this.updateRgb();
  }

  changeLightness(value: number){
    this.lightness = value;
    this.updateRgb();
  }

  selectHslColor([hue, saturation, lightness]: number[]){
    [this.hue, this.saturation, this.lightness] = [hue, saturation, lightness];
    this.updateRgb();
  }

}
