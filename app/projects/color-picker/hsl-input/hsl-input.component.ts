import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { colorDimension } from '../enums';

import * as _ from 'lodash';

@Component({
  selector: 'hsl-input',
  templateUrl: 'hsl-input.component.html',
  styleUrls: ['./hsl-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HslInputComponent {
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;
  @Input() useDegrees: boolean;
  
  @Output() selectColor: EventEmitter<number[]> = new EventEmitter();

  // stores latest valid user input
  private cache: string = '';

  get hslValue(){
    const prevValues = this.getValues(this.cache);
    const [prevRed, prevGreen, prevBlue] = this.hslToRgb(prevValues[0], prevValues[1], prevValues[2]);
    // Value is updated to proper syntax only if the change comes from outside source,
    // meaning that new value doesn't match current input.
    // Otherwise input field could have its value changed while the user is still typing
    if(prevRed === this.red && prevGreen === this.green && prevBlue === this.blue){
      return this.cache;
    }
    const hsl = this.rgbToHsl(this.red, this.green, this.blue);

    if(this.useDegrees){
      const [hue, saturation, lightness] = this.convertToDegrees(hsl).map(Math.round);
      return `hsl(${hue}, ${saturation} %, ${lightness} %)`;
    }else{
      const [hue, saturation, lightness] = hsl.map((value) => value.toFixed(3));
      return `hsl(${hue}, ${saturation}, ${lightness})`;
    }
  }
  
  convertToDegrees([hue, saturation, lightness]: number[]){
    return [hue*360, saturation*100, lightness*100]
  }

  hslChanged(value: string){
    const hslValues = this.getValues(value);
    console.log('hslValues', hslValues)
    if(hslValues.length !== 3 || _.some(hslValues, (number) => !(0 <= number && number <= 1))){ return; }
    this.cache = value;
    this.selectColor.emit(this.hslToRgb(hslValues[0], hslValues[1], hslValues[2]));
  }

  convertFromDegrees([hue, saturation, lightness]: number[]){
    return [hue/360, saturation/100, lightness/100];
  }
  
  private getValues(hslString: string){
    hslString = hslString.replace(/[^0123456789,.]/g, '');
    let values = hslString.split(',').map((val) => parseFloat(val));
    if(this.useDegrees){
      values = this.convertFromDegrees(values);
    }
    return values;
  }

  // Converts hsl to rgb with the power of math
  private hslToRgb(hue: number, saturation: number, lightness: number){

    if(saturation === 0){
      return [255, 255, 255];
    }

    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
    const p = 2 * lightness - q;
    const red = this.hueTransform(p, q, hue + 1/3);
    const green = this.hueTransform(p, q, hue);
    const blue = this.hueTransform(p, q, hue - 1/3);

    return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
  }

  // Helper function for hslToRgb
  private hueTransform(p: number, q: number, t: number){
    if(t < 0){ t += 1; }
    if(t > 1){ t -= 1; }
    if(t < 1/6){ return p + (q - p) * 6 * t; }
    if(t < 1/2){ return q; }
    if(t < 2/3){ return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }

  private rgbToHsl(red: number, green: number, blue: number){
    red /= 255, green /= 255, blue /= 255;
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue);
    const lightness = (max + min) / 2;
    let saturation = lightness;
    let hue = lightness;

    if(max === min){
      hue = saturation = 0;
    }else{
      const d = max - min;
      saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case red: hue = (green - blue) / d + (green < blue ? 6 : 0); break;
        case green: hue = (blue - red) / d + 2; break;
        case blue: hue = (red - green) / d + 4; break;
      }
      hue /= 6;
    }

    return [hue, saturation, lightness];
  }
}
