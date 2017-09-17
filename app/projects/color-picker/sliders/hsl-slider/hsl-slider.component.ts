import { 
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, 
  Input, OnChanges, Output, SimpleChanges 
} from '@angular/core';

import { colorChannel, hslChannel } from '../../enums';

import { ColorService } from '../../color.service';

/**
 * Slider component that displays hue, saturation or lightness color channel ranges, and an input box displaying current value
 */
@Component({
  selector: 'hsl-slider',
  templateUrl: 'hsl-slider.component.html',
  styleUrls: ['../slider.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HslSliderComponent implements OnChanges {

  context: CanvasRenderingContext2D;
  
  @Input() hue: number;
  @Input() saturation: number;
  @Input() lightness: number;

  @Input() type: hslChannel;
  @Input() coordinate: string;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  
  width: number = 256;
  height: number = 30;
  
  data: ImageData;
  selectorColor: string;

  constructor(private colorService: ColorService, private changeRef: ChangeDetectorRef){}

  // Updates background and/or color selector
  ngOnChanges(changes: SimpleChanges){
    if(!this.context){ return; }
    this.generateImageData();
    this.updateSelectorColor();
  }
  
  get value(){
    const value = this[this.type];
    switch(this.type){
      case hslChannel.H: return value / 360 * 255;
      case hslChannel.S: 
      case hslChannel.L: return value * 2.55;
    }
  }

  get formattedValue(){
    const value = this[this.type];

    switch(this.type){
      case hslChannel.H: return Math.round(value);
      case hslChannel.L:
      case hslChannel.S: return Math.round(value * 10)/10;
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
    const h = this.type === hslChannel.H ? 360*x/255 : this.hue; 
    const s = this.type === hslChannel.S ? x/2.55 : this.saturation; 
    const l = this.type === hslChannel.L ? x/2.55 : this.lightness;
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
    const rgb = this.colorService.hslToRgb([this.hue, this.saturation, this.lightness]);
    this.selectorColor = this.colorService.getContrastColor(rgb[0], rgb[1], rgb[2]);
  }
  
  emitValueChange(value: number, degrees: boolean = true){
    // If not in degrees, values are between [0,1]
    if(!degrees){
      value *= this.type === hslChannel.H ? 360 : 100;
    }

    if(this.type === hslChannel.H){
      value = Math.max(0, Math.min(value, 360));
    }else{
      value = Math.max(0, Math.min(value, 100));
    }

    this.valueChange.emit(value);
  }
}
