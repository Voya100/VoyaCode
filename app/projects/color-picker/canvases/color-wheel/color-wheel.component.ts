import { 
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, 
  Output, SimpleChange, SimpleChanges, ViewChild 
} from '@angular/core';
import { colorChannel } from '../../enums';
import { ColorService } from '../../color.service';

/**
 * Color wheel that displays colors with HSL channels
 * Angle = Hue (0 at the top, clockwise)
 * Radius = Saturation (0 at middle, 100 % at the edge)
 * Constant = Lightness
 */
@Component({
  selector: 'color-wheel',
  templateUrl: 'color-wheel.component.html',
  styleUrls: ['./color-wheel.component.scss']
})
export class ColorWheelComponent implements AfterViewInit, OnChanges {
  
  @ViewChild('colorWheel') colorCanvas: ElementRef;
  context: CanvasRenderingContext2D;

  @Output() selectColor: EventEmitter<number[]> = new EventEmitter();

  @Input() hue: number;
  @Input() saturation: number;
  @Input() lightness: number;

  data: ImageData;

  width: number = 300;
  height: number = 300;

  xCenter: number = this.width / 2;
  yCenter: number = this.height / 2;

  // Radius for main wheel - complete radius is radius + fadeRadius
  radius: number = 145;

  // Softens the edge of the wheel by fading it out with alpha channel
  fadeRadius: number = 5;
  
  circleLineWidth: number = 2;
  
  constructor(private colorService: ColorService) { }
  
  // Fill the canvas after it has been initialized
  ngAfterViewInit(){
    this.context = this.colorCanvas.nativeElement.getContext('2d');
    this.generateImageData();
    this.drawCanvas();
  }

  ngOnChanges(changes: SimpleChanges){
    if(!this.context){ return; }

    // Generate pixels for background only if it has changed
    if(changes.lightness){
      this.generateImageData();
    }

    this.drawCanvas();
  }

  onDrag(x: number, y: number){
    const colors = {};
    const hue = this.getAngle(x, y);
    let saturation = this.getR(x, y) / this.radius * 100;

    // If user clicked outside the circle, round down to 100 %
    saturation = Math.min(saturation, 100);

    this.selectColor.emit([hue, saturation, this.lightness]);
  }

  // Returns distance from center
  getR(x: number, y: number){
    x = this.xCenter - x;
    y = this.yCenter - y;
    return Math.sqrt(x*x + y*y);
  }

  // Returns positive angle in degrees between (xCenter, yCenter) -> (x,y) and (xCenter, yCenter) -> (0,r)
  getAngle(x: number, y: number){
    const angle = Math.atan2(x - this.xCenter, this.yCenter-y) / Math.PI * 180;
    return angle > 0 ? angle : angle + 360;
  }

  // Draws canvas background and circle indicator on the selected color
  drawCanvas(){
    this.context.putImageData(this.data, 0, 0);
    this.drawCircle();
  }

  generateImageData(){
    const data = this.context.createImageData(this.width, this.height);
    for(let x = 0; x <= this.width; x++){
      for(let y = 0; y <= this.height; y++){
        this.setPixel(data, x, y);
      }
    }
    this.data = data;    
  }

  setPixel(imageData: ImageData, x: number, y: number){
    let r = this.getR(x, y);
    let alpha = 255;
    if(r > this.radius){
      // Add fading if r is within fade area
      if(r < this.radius + this.fadeRadius){
        alpha *= (1 - (r-this.radius)/this.fadeRadius);
        r = this.radius;
      }else{
        return;
      } 
    }
    const hue = this.getAngle(x, y);
    const saturation = r/this.radius*100;

    const [red, green, blue] = this.colorService.hslToRgb([hue, saturation, this.lightness]);

    const index = (x + y * imageData.width) * 4;
    imageData.data[index] = red;
    imageData.data[index+1] = green;
    imageData.data[index+2] = blue;
    imageData.data[index+3] = alpha;
  }

  // Draws a circle to canvas where the selected colour is located
  drawCircle(){
    const cicrleRadius = 5;

    const [red, green, blue] = this.colorService.hslToRgb([this.hue, this.saturation, this.lightness])
    this.context.strokeStyle = this.colorService.getContrastColor(red, green, blue);
    this.context.lineWidth = this.circleLineWidth;

    this.context.beginPath();
    this.context.arc(this.getX(), this.getY(), cicrleRadius, 0, 2*Math.PI);
    this.context.stroke();   
  }

  // Returns x location of selected color
  getX(){
    const r = this.saturation / 100 * this.radius;
    const angle = this.hue / 180 * Math.PI;
    return this.xCenter + r * Math.sin(angle);
  }

  // Returns y location of selected color
  getY(){
    const r = this.saturation / 100 * this.radius;
    const angle = this.hue / 180 * Math.PI;
    return this.yCenter - r * Math.cos(angle);
  }

}
