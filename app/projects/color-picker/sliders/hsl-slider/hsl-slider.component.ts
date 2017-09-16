import { 
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, 
  Input, OnChanges, Output, SimpleChanges 
} from '@angular/core';

import { colorDimension, hslDimension } from '../../enums';

import { ColorService } from '../../color.service';

/**
 * Slider component that displays hue, saturation or lightness color channel ranges, and an input box displaying current value
 */
@Component({
  selector: 'hsl-slider',
  templateUrl: 'hsl-slider.component.html',
  styleUrls: ['./hsl-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HslSliderComponent implements OnChanges {

  context: CanvasRenderingContext2D;
  
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;

  @Input() type: hslDimension;
  @Input() coordinate: string;

  @Output() valueChange: EventEmitter<number[]> = new EventEmitter();
  
  width: number = 256;
  height: number = 30;
  
  data: ImageData;
  selectorColor: string;

  hue: number;
  saturation: number;
  lightness: number;

  constructor(private colorService: ColorService, private changeRef: ChangeDetectorRef){}

  // Updates background and/or color selector
  ngOnChanges(changes: SimpleChanges){
    const [prevHue, prevSaturation] = [this.hue, this.saturation];

    // Update hsl values to match new rgb values
    [this.hue, this.saturation, this.lightness] = this.colorService.rgbToHsl([this.red, this.green, this.blue]);

    // If lightness is 100 %, hue and saturation can't be determined from RGB value, which causes issues
    // Because of this, the old values are kept in this case
    // TODO: Implement a better solution
    if(this.lightness === 1){
      this.hue = prevHue || this.hue;
      this.saturation = prevSaturation || this.saturation;
    }

    if(!this.context){ return; }
    this.generateImageData();
    this.updateSelectorColor();
  }
  
  get value(){
    const value = this[this.type];
    switch(this.type){
      case hslDimension.H: return value / 360 * 255;
      case hslDimension.S: 
      case hslDimension.L: return value * 2.55;
    }
  }

  get formattedValue(){
    const value = this[this.type];

    switch(this.type){
      case hslDimension.H: return Math.round(value);
      case hslDimension.L:
      case hslDimension.S: return Math.round(value * 10)/10;
    }

  }

  // Is called after child has initialized canvas context
  setContext(context: CanvasRenderingContext2D){
    this.context = context;
    this.generateImageData();
    // Change detection needs to be run for this due to use of push strategy
    this.changeRef.detectChanges();
  }

  // This could also be implemented with gradient, but gradient skips every other color value (on Chrome),
  // which is why each pixel is set manually
  generateImageData(){
    const width = this.width;
    const height = this.height;

    const imageData = this.context.createImageData(width, height);
    for(let x = 0; x < width; x++){
      this.setColumn(imageData, x, height);
    }
    this.data = imageData;
  }

  setColumn(imageData: ImageData, x: number, height: number){
    const h = this.type === hslDimension.H ? 360*x/255 : this.hue; 
    const s = this.type === hslDimension.S ? x/2.55 : this.saturation; 
    const l = this.type === hslDimension.L ? x/2.55 : this.lightness;
    const [red, green, blue] = this.colorService.hslToRgb([h, s, l]);

    for(let y = 0; y < height; y++){
      const index = (x + y * imageData.width) * 4;
      imageData.data[index] = red;
      imageData.data[index+1] = green;
      imageData.data[index+2] = blue;
      imageData.data[index+3] = 255; // alpha
    }
  }

  updateSelectorColor(){
    this.selectorColor = this.colorService.getContrastColor(this.red, this.green, this.blue);
  }
  
  emitValueChange(value: number, degrees: boolean = true){
    // If not in degrees, values are between [0,1]
    const h = this.type === hslDimension.H ? value * (degrees ? 1 : 360) : this.hue; 
    const s = this.type === hslDimension.S ? value * (degrees ? 1 : 100) : this.saturation; 
    const l = this.type === hslDimension.L ? value * (degrees ? 1 : 100) : this.lightness; 

    this.valueChange.emit(this.colorService.hslToRgb([h, s, l]));
  }
}
