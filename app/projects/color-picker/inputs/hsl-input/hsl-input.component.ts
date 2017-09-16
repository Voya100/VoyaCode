import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as _ from 'lodash';

import { colorDimension } from '../../enums';
import { ColorService } from '../../color.service';

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

  constructor(private colorService: ColorService){}

  get hslValue(){
    const prevValues = this.getValues(this.cache);
    const [prevRed, prevGreen, prevBlue] = this.colorService.hslToRgb(prevValues);
    // Value is updated to proper syntax only if the change comes from outside source,
    // meaning that new value doesn't match current input.
    // Otherwise input field could have its value changed while the user is still typing
    if(prevRed === this.red && prevGreen === this.green && prevBlue === this.blue){
      return this.cache;
    }
    const hsl = this.colorService.rgbToHsl([this.red, this.green, this.blue]);

    if(this.useDegrees){
      const [hue, saturation, lightness] = this.colorService.convertToDegrees(hsl).map(Math.round);
      return `hsl(${hue}, ${saturation} %, ${lightness} %)`;
    }else{
      const [hue, saturation, lightness] = hsl.map((value) => value.toFixed(3));
      return `hsl(${hue}, ${saturation}, ${lightness})`;
    }
  }
  
  hslChanged(value: string){
    const hslValues = this.getValues(value);
    if(hslValues.length !== 3 || _.some(hslValues, (number) => !(0 <= number && number <= 1))){ return; }
    this.cache = value;
    this.selectColor.emit(this.colorService.hslToRgb(hslValues));
  }
  
  private getValues(hslString: string){
    hslString = hslString.replace(/[^0123456789,.]/g, '');
    let values = hslString.split(',').map((val) => parseFloat(val));
    if(this.useDegrees){
      values = this.colorService.convertFromDegrees(values);
    }
    return values;
  }
}
