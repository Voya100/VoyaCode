import { Component } from '@angular/core';
import { colorDimension } from './enums';

@Component({
  templateUrl: 'color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  zDimension: colorDimension = colorDimension.B;

  redColor: colorDimension = colorDimension.R;
  greenColor: colorDimension = colorDimension.G;
  blueColor: colorDimension = colorDimension.B;

  hslDegrees: boolean = true;

  _red: number = 0;
  _green: number = 0;
  _blue: number = 0;

  // [x, y, z] color dimensions for zDimension key (options: RGB, BRG, GBR)
  private dimensions: { [key: string]: colorDimension[] } = {
    [colorDimension.R]: [colorDimension.G, colorDimension.B, colorDimension.R],
    [colorDimension.G]: [colorDimension.B, colorDimension.R, colorDimension.G],
    [colorDimension.B]: [colorDimension.R, colorDimension.G, colorDimension.B]
  }

  constructor() { }

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
  }
  
  changeGreen(greenValue: number){
    this.green = greenValue;
  }

  changeBlue(blueValue: number){
    this.blue = blueValue;
  }

  selectColor([red, green, blue]: number[]){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

}
