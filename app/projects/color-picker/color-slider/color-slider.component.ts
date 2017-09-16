import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

import { colorDimension } from '../enums';

@Component({
  selector: 'color-slider',
  templateUrl: 'color-slider.component.html',
  styleUrls: ['./color-slider.component.scss']
})
export class ColorSliderComponent implements AfterViewInit, OnChanges {

  @ViewChild('sliderCanvas') sliderCanvas: ElementRef;
  context: CanvasRenderingContext2D;

  @Input() color: colorDimension;
  @Input() coordinate: string;
  
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;

  @Input() showAllDimensions: boolean;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();

  width: number = 256;
  height: number = 30;
  
  data: ImageData;

  constructor() { }
  
  ngAfterViewInit(){
    this.context = this.sliderCanvas.nativeElement.getContext('2d');
    this.generateImageData();
    this.drawSlider();
  }

  // Updates background and/or color selector
  ngOnChanges(changes: SimpleChanges){
    if(!this.context){ return; }

    // Generate pixels for background only if it has changed
    if(changes[this.color] || changes.showAllDimensions || this.showAllDimensions){
      this.generateImageData();
    }
    this.drawSlider();
  }

  getValue(){
    return this[this.color];
  }

  drawSlider(){
    this.context.putImageData(this.data, 0, 0);
    this.drawSelectedValueIndicator();
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
    const red =  this.color === colorDimension.R ? x : (this.showAllDimensions ? this.red : 0);
    const green =  this.color === colorDimension.G ? x : (this.showAllDimensions ? this.green : 0);
    const blue =  this.color === colorDimension.B ? x : (this.showAllDimensions ? this.blue : 0);

    for(let y = 0; y < height; y++){
      const index = (x + y * imageData.width) * 4;
      imageData.data[index] = red;
      imageData.data[index+1] = green;
      imageData.data[index+2] = blue;
      imageData.data[index+3] = 255; // alpha
    }
  }
  
  drawSelectedValueIndicator(){
    const value = this[this.color];
    const red =  this.color === colorDimension.R || this.showAllDimensions ? this.red : 0;
    const green =  this.color === colorDimension.G || this.showAllDimensions ? this.green : 0;
    const blue =  this.color === colorDimension.B || this.showAllDimensions ? this.blue : 0;

    // Helps to create optimal contrast with background
    const L = 0.2126 * red/255 + 0.7152 * green/255 + 0.0722 * blue/255;
    this.context.strokeStyle = L > 0.5 ? 'black' : 'white';
    this.context.beginPath();
    this.context.moveTo(value, 0);
    this.context.lineTo(value, this.height);
    this.context.stroke();
  }

  emitValueChange(value: number){
    value = Math.min(Math.max(value, 0), 255);
    this[this.color] = value;
    this.valueChange.emit(value);
  }

}
