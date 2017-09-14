import { Component } from '@angular/core';
import { colorDimension } from './enums';

@Component({
  templateUrl: 'color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {

  redColor: colorDimension = colorDimension.R;
  greenColor: colorDimension = colorDimension.G;
  blueColor: colorDimension = colorDimension.B;

  red: number = 0;
  green: number = 0;
  blue: number = 0;

  constructor() { }

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
