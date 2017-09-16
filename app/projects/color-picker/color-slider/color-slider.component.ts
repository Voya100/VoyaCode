import { 
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, 
  EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild 
} from '@angular/core';

import { colorDimension } from '../enums';

/**
 * Slider component that displays data input as a background and adds selector to x position that matches value input.
 */
@Component({
  selector: 'color-slider',
  templateUrl: 'color-slider.component.html',
  styleUrls: ['./color-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSliderComponent implements AfterViewInit, OnChanges {

  @ViewChild('sliderCanvas') sliderCanvas: ElementRef;
  context: CanvasRenderingContext2D;

  @Input() width: number;
  @Input() height: number;

  @Input() data: ImageData;
  @Input() value: number;
  @Input() selectorColor: string;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();
  @Output() contextInit: EventEmitter<CanvasRenderingContext2D> = new EventEmitter();

  constructor() { }

  ngAfterViewInit(){
    this.context = this.sliderCanvas.nativeElement.getContext('2d');
    this.contextInit.emit(this.context);
  }

  // Updates background and/or color selector
  ngOnChanges(changes: SimpleChanges){
    if(!this.context){ return; }
    this.drawSlider();
  }

  drawSlider(){
    this.context.putImageData(this.data, 0, 0);
    this.drawSelectedValueIndicator();
  }

  drawSelectedValueIndicator(){
    this.context.strokeStyle = this.selectorColor;
    this.context.beginPath();
    this.context.moveTo(this.value, 0);
    this.context.lineTo(this.value, this.height);
    this.context.stroke();
  }

  emitValueChange(value: number){
    this.valueChange.emit(value);
  }

}
