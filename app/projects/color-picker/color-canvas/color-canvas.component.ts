import { 
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, 
  Output, SimpleChange, SimpleChanges, ViewChild 
} from '@angular/core';
import { colorDimension } from '../enums';

@Component({
  selector: 'color-canvas',
  templateUrl: 'color-canvas.component.html',
  styleUrls: ['./color-canvas.component.scss']
})
export class ColorCanvasComponent implements AfterViewInit, OnChanges {
  
  @ViewChild('colorCanvas') colorCanvas: ElementRef;
  context: CanvasRenderingContext2D;

  @Output() selectColor: EventEmitter<{}> = new EventEmitter();

  @Input() xDimension: colorDimension;
  @Input() yDimension: colorDimension;
  @Input() zDimension: colorDimension;
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

  onDrag(x: number, y: number){
    const colors = {};
    colors[this.xDimension] = this.roundColor(x);
    colors[this.yDimension] = this.roundColor(255 - y);
    colors[this.zDimension] = this.roundColor(this[this.zDimension]);
    this.selectColor.emit(colors);
  }

  // Ensures that color value is between 0-255, because canvas events may sometimes return values outside
  // of this range
  roundColor(value: number){
    return Math.max(0, Math.min(value, 255));
  }

  // Draws canvas background and circle indicator on the selected color
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
    if(dimension === this.xDimension){
      return x;
    }else if(dimension === this.yDimension){
      return 255 - y;
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
    return this[this.xDimension];
  }

  // Returns y location of selected color
  getY(){
    return 255 - this[this.yDimension];
  }

}
