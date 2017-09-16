import { Component } from '@angular/core';
import { colorDimension, hslDimension } from './enums';
import { ColorService } from './color.service';

@Component({
  templateUrl: 'color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  zDimension: colorDimension = colorDimension.B;

  redColor: colorDimension = colorDimension.R;
  greenColor: colorDimension = colorDimension.G;
  blueColor: colorDimension = colorDimension.B;

  hueChannel: hslDimension = hslDimension.H;
  saturationChannel: hslDimension = hslDimension.S;
  lightnessChannel: hslDimension = hslDimension.L;

  rgbSliderAllChannels: boolean = true;

  _red: number = 37;
  _green: number = 134;
  _blue: number = 204;

  hue: number;
  saturation: number;
  lightness: number;

  // [x, y, z] color dimensions for zDimension key (options: RGB, BRG, GBR)
  private dimensions: { [key: string]: colorDimension[] } = {
    [colorDimension.R]: [colorDimension.G, colorDimension.B, colorDimension.R],
    [colorDimension.G]: [colorDimension.B, colorDimension.R, colorDimension.G],
    [colorDimension.B]: [colorDimension.R, colorDimension.G, colorDimension.B]
  }

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
    return Math.max(0, Math.min(value, 255));
  }

  get xDimension(){
    return this.dimensions[this.zDimension][0];
  }

  get yDimension(){
    return this.dimensions[this.zDimension][1];
  }

  getCoordinate(color: colorDimension){
    const index = this.dimensions[this.zDimension].indexOf(color);
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
