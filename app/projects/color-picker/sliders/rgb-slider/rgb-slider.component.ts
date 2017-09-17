import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { colorChannel } from '../../enums';
import { ColorService } from '../../color.service';

/**
 * Slider component that displays red, green or blue color channel ranges, and an input box displaying current value
 */
@Component({
  selector: 'rgb-slider',
  templateUrl: 'rgb-slider.component.html',
  styleUrls: ['../slider.scss']
})
export class RgbSliderComponent implements OnChanges {

  context: CanvasRenderingContext2D;
  
  @Input() color: colorChannel;
  @Input() coordinate: string;
  
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;

  @Input() showAllChannels: boolean;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  
  width: number = 256;
  height: number = 30;
  
  data: ImageData;
  selectorColor: string;

  constructor(private colorService: ColorService){}

  // Updates background and/or color selector
  ngOnChanges(changes: SimpleChanges){
    if(!this.context){ return; }

    // Generate pixels for background only if it has changed
    if(changes[this.color] || changes.showAllChannels || this.showAllChannels){
      this.generateImageData();
    }
    this.updateSelectorColor();
  }
  
  get value(){
    return this[this.color];
  }

  // Is called after child has initialized canvas context
  setContext(context: CanvasRenderingContext2D){
    this.context = context;
    // Small timeout to prevent 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.generateImageData());    
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
    const red =  this.color === colorChannel.R ? x : (this.showAllChannels ? this.red : 0);
    const green =  this.color === colorChannel.G ? x : (this.showAllChannels ? this.green : 0);
    const blue =  this.color === colorChannel.B ? x : (this.showAllChannels ? this.blue : 0);

    for(let y = 0; y < height; y++){
      const index = (x + y * imageData.width) * 4;
      imageData.data[index] = red;
      imageData.data[index+1] = green;
      imageData.data[index+2] = blue;
      imageData.data[index+3] = 255; // alpha
    }
  }

  updateSelectorColor(){
    const value = this[this.color];
    const red =  this.color === colorChannel.R || this.showAllChannels ? this.red : 0;
    const green =  this.color === colorChannel.G || this.showAllChannels ? this.green : 0;
    const blue =  this.color === colorChannel.B || this.showAllChannels ? this.blue : 0;

    this.selectorColor = this.colorService.getContrastColor(red, green, blue);
  }
  
  emitValueChange(value: number){
    this.valueChange.emit(value);
  }
}
