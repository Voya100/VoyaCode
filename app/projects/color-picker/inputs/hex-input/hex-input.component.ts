import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'hex-input',
  templateUrl: 'hex-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HexInputComponent {
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;
  
  @Output() selectColor: EventEmitter<number[]> = new EventEmitter();

  // stores latest user input
  private cache: string = '';

  get hexValue(){
    const [prevRed, prevGreen, prevBlue] = this.hexToColors(this.cache);
    // Value is updated to proper syntax only if the change comes from outside source,
    // meaning that new value doesn't match current input.
    // Otherwise input field could have its value changed while the user is still typing
    if(prevRed === this.red && prevGreen === this.green && prevBlue === this.blue){
      return this.cache;
    }
    return '#' + this.toHex(this.red) + this.toHex(this.green) + this.toHex(this.blue);
  }
  
  hexChanged(hex: string){
    const colors = this.hexToColors(hex);
    if(colors.length !== 3){ return; }
    this.cache = hex;
    this.selectColor.emit(colors);
  }

  private toHex(value: number){
    let hex = value.toString(16);
    if(hex.length === 1){
      hex = '0' + hex;
    }
    return hex;
  }

  private hexToColors(hex: string){
    if(hex[0] === '#'){ hex = hex.slice(1) }
    if(hex.length !== 6){ return []; }
    const red = this.fromHex(hex.slice(0, 2));
    const green = this.fromHex(hex.slice(2, 4));
    const blue = this.fromHex(hex.slice(4, 6));
    return [red, green, blue].filter((number) => _.inRange(number, 0, 256));
  }

  private fromHex(value: string){
    return parseInt(value, 16);
  }
  
}
