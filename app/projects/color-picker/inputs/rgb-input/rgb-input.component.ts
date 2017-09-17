import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'rgb-input',
  templateUrl: 'rgb-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RgbInputComponent {
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;
  
  @Output() selectColor: EventEmitter<number[]> = new EventEmitter();

  // stores latest user input
  private cache: string = '';
  
  constructor() { }

  get rgbValue(){
    const prevValues = this.getValues(this.cache);
    // Value is updated to proper syntax only if the change comes from outside source,
    // meaning that new value doesn't match current input.
    // Otherwise input field could have its value changed while the user is still typing
    if(prevValues[0] === this.red && prevValues[1] === this.green && prevValues[2] === this.blue){
      return this.cache;
    }
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  rgbChanged(value: string){
    const rgbValues = this.getValues(value);
    if(rgbValues.length !== 3 || _.some(rgbValues, (number) => !_.inRange(number, 0, 256))){ return; }
    this.cache = value;
    this.selectColor.emit(rgbValues);
  }

  private getValues(rgbString: string){
    rgbString = rgbString.replace(/[^0123456789,]/g, '');
    return rgbString.split(',').map((val) => parseInt(val, 10));
  }
}
