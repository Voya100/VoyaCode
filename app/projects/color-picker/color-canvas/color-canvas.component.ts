import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { colorDimension } from '../enums';

// [x, y, z] color dimensions for zDimension key (options: RGB, BRG, GBR)
const dimensions = {
  [colorDimension.R]: [colorDimension.G, colorDimension.B, colorDimension.R],
  [colorDimension.G]: [colorDimension.B, colorDimension.R, colorDimension.G],
  [colorDimension.B]: [colorDimension.R, colorDimension.G, colorDimension.B]
}

@Component({
  selector: 'color-canvas',
  templateUrl: 'color-canvas.component.html',
  styleUrls: ['./color-canvas.component.scss']
})
export class ColorCanvasComponent implements AfterViewInit, OnChanges {
  
  @ViewChild('colorCanvas') colorCanvas: ElementRef;
  context: CanvasRenderingContext2D;

  @Input() zDimension: colorDimension = colorDimension.R;
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;

  data: ImageData;
  
  constructor() { }
  
  // Fill the canvas after it has been initialized
  ngAfterViewInit(){
    this.context = this.colorCanvas.nativeElement.getContext('2d');
    this.generateImageData();
    this.drawCanvas();
  }

  ngOnChanges(changes: SimpleChanges){
    if(!this.context){ return; }

    // Generate pixels for background only if it has changed
    if(changes[this.zDimension] || changes['zDimension']){
      this.generateImageData();
    }

    this.drawCanvas();
  }

  drawCanvas(){
    this.context.putImageData(this.data, 0, 0);
    this.drawCircle();
  }

  generateImageData(){
    const data = this.context.createImageData(256, 256);
    for(let x = 0; x <= 255; x++){
      for(let y = 0; y <= 255; y++){
        this.setPixel(data, x, y);
      }
    }
    this.data = data;    
  }

  setPixel(imageData: ImageData, x: number, y: number){
    const index = (x + y * imageData.width) * 4;
    imageData.data[index] = this.getColor(colorDimension.R, x, y);
    imageData.data[index+1] = this.getColor(colorDimension.G, x, y);
    imageData.data[index+2] = this.getColor(colorDimension.B, x, y);
    imageData.data[index+3] = 255; // alpha
  }

  // Returns color value for color of specific dimension at location (x, y)
  getColor(dimension: colorDimension, x: number, y: number){
    if(dimensions[this.zDimension][0] === dimension){
      return x;
    }else if(dimensions[this.zDimension][1] === dimension){
      return y;
    }else{
      return this[dimension];
    }
  }

  // Draws circle to canvas where the selected colour is located
  drawCircle(){
    const cicrleRadius = 5;
    
    // Helps to create optimal contrast with background
    const L = 0.2126 * this.red/255 + 0.7152 * this.green/255 + 0.0722 * this.blue/255;
    this.context.strokeStyle = L > 0.5 ? 'black' : 'white';

    this.context.beginPath();
    this.context.arc(this.getX(), this.getY(), cicrleRadius, 0, 2*Math.PI);
    this.context.stroke();   
  }

  // Returns x location of selected color
  getX(){
    return this[dimensions[this.zDimension][0]];
  }

  // Returns y location of selected color
  getY(){
    return this[dimensions[this.zDimension][1]];
  }

}
