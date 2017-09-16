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

  red: number = 0;
  green: number = 0;
  blue: number = 0;

  // [x, y, z] color dimensions for zDimension key (options: RGB, BRG, GBR)
  private dimensions: { [key: string]: colorDimension[] } = {
    [colorDimension.R]: [colorDimension.G, colorDimension.B, colorDimension.R],
    [colorDimension.G]: [colorDimension.B, colorDimension.R, colorDimension.G],
    [colorDimension.B]: [colorDimension.R, colorDimension.G, colorDimension.B]
  }

  constructor() { }

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

  selectColor(colorDimensions: {}){
    this.red = colorDimensions[colorDimension.R];
    this.green = colorDimensions[colorDimension.G];
    this.blue = colorDimensions[colorDimension.B];
  }

}
