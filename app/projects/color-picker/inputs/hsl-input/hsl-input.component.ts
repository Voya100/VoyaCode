import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as _ from 'lodash';

import { ColorService } from '../../color.service';

@Component({
  selector: 'hsl-input',
  templateUrl: 'hsl-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HslInputComponent {
  @Input() hue: number;
  @Input() saturation: number;
  @Input() lightness: number;
  
  @Output() selectColor: EventEmitter<number[]> = new EventEmitter();

  // stores latest valid user input
  private cache: string = '';

  constructor(private colorService: ColorService){}

  get hslValue(){
    const prevValues = this.getValues(this.cache);
    const [prevHue, prevSaturation, prevLightness] = this.colorService.hslToRgb(prevValues);
    // Value is updated to proper syntax only if the change comes from outside source,
    // meaning that new value doesn't match current input.
    // Otherwise input field could have its value changed while the user is still typing
    if(prevHue === this.hue && prevSaturation === this.saturation && prevLightness === this.lightness){
      return this.cache;
    }

    return `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation*10)/10} %, ${Math.round(this.lightness*10)/10} %)`;
  }
  
  hslChanged(value: string){
    const hslValues = this.getValues(value);
    if(hslValues.length !== 3 
      || !(0 <= hslValues[0] && hslValues[0] <= 360)
      || !(0 <= hslValues[1] && hslValues[1] <= 100)
      || !(0 <= hslValues[2] && hslValues[2] <= 100)
    ){ return; }
    this.cache = value;
    this.selectColor.emit(hslValues);
  }
  
  private getValues(hslString: string){
    hslString = hslString.replace(/[^0123456789,.]/g, '');
    const values = hslString.split(',').map((val) => parseFloat(val));
    return values;
  }
}
