import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { ColorService } from '../../color.service';
import { colorChannel } from '../../enums';

@Component({
  selector: 'color-canvas',
  templateUrl: 'color-canvas.component.html',
  styleUrls: ['./color-canvas.component.scss']
})
export class ColorCanvasComponent implements AfterViewInit, OnChanges {
  @ViewChild('colorCanvas') colorCanvas: ElementRef;
  context: CanvasRenderingContext2D;

  @Output() selectColor: EventEmitter<number[]> = new EventEmitter();

  @Input() xAxis: colorChannel;
  @Input() yAxis: colorChannel;
  @Input() zAxis: colorChannel;
  @Input() red: number;
  @Input() green: number;
  @Input() blue: number;

  data: ImageData;

  circleLineWidth: number = 2;

  constructor(private colorService: ColorService) {}

  // Fill the canvas after it has been initialized
  ngAfterViewInit() {
    this.context = this.colorCanvas.nativeElement.getContext('2d');
    this.generateImageData();
    this.drawCanvas();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.context) {
      return;
    }

    // Generate pixels for background only if it has changed
    if (changes[this.zAxis] || changes['zAxis']) {
      this.generateImageData();
    }

    this.drawCanvas();
  }

  onDrag(x: number, y: number) {
    const colors = {};
    colors[this.xAxis] = x;
    colors[this.yAxis] = 255 - y;
    colors[this.zAxis] = this[this.zAxis];
    this.selectColor.emit([colors[colorChannel.R], colors[colorChannel.G], colors[colorChannel.B]]);
  }

  // Draws canvas background and circle indicator on the selected color
  drawCanvas() {
    this.context.putImageData(this.data, 0, 0);
    this.drawCircle();
  }

  generateImageData() {
    const data = this.context.createImageData(256, 256);
    for (let x = 0; x <= 255; x++) {
      for (let y = 0; y <= 255; y++) {
        this.setPixel(data, x, y);
      }
    }
    this.data = data;
  }

  setPixel(imageData: ImageData, x: number, y: number) {
    const index = (x + y * imageData.width) * 4;
    imageData.data[index] = this.getColor(colorChannel.R, x, y);
    imageData.data[index + 1] = this.getColor(colorChannel.G, x, y);
    imageData.data[index + 2] = this.getColor(colorChannel.B, x, y);
    imageData.data[index + 3] = 255; // alpha
  }

  // Returns color value for color of specific dimension at location (x, y)
  getColor(dimension: colorChannel, x: number, y: number) {
    if (dimension === this.xAxis) {
      return x;
    } else if (dimension === this.yAxis) {
      return 255 - y;
    } else {
      return this[dimension];
    }
  }

  // Draws circle to canvas where the selected colour is located
  drawCircle() {
    const cicrleRadius = 5;
    this.context.strokeStyle = this.colorService.getContrastColor(this.red, this.green, this.blue);
    this.context.lineWidth = this.circleLineWidth;

    this.context.beginPath();
    this.context.arc(this.getX(), this.getY(), cicrleRadius, 0, 2 * Math.PI);
    this.context.stroke();
  }

  // Returns x location of selected color
  getX() {
    return this[this.xAxis];
  }

  // Returns y location of selected color
  getY() {
    return 255 - this[this.yAxis];
  }
}
