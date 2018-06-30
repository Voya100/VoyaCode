import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorService } from '../color.service';

@Component({
  selector: 'saved-colors',
  templateUrl: 'saved-colors.component.html',
  styleUrls: ['./saved-colors.component.scss']
})
export class SavedColorsComponent {
  @Input() hue: number;
  @Input() saturation: number;
  @Input() lightness: number;
  
  @Output() setColor: EventEmitter<number[]> = new EventEmitter();

  selectedIndex: number = -1;

  constructor(public colorService: ColorService) {
  }

  get colors(){
    return this.colorService.savedColors;
  }

  selectColor(id: number){
    this.setColor.emit(this.colors[id]);
    this.selectedIndex = id;
  }

  addColor(){
    this.colorService.addColor(this.hue, this.saturation, this.lightness);
  }

  editColor(){
    this.colorService.editColor(this.selectedIndex, this.hue, this.saturation, this.lightness);
  }

  removeColor(){
    this.colorService.removeColor(this.selectedIndex);
    if(this.selectedIndex >= this.colors.length){
      this.selectedIndex = this.colors.length ? this.colors.length - 1 : 0;
    }
  }

  addAllHues(){
    for(let hue = 0; hue < 360; hue += 18){
      this.colorService.addColor(hue, this.saturation, this.lightness);
    }
  }

  removeAll(){
    this.colorService.removeAllColors();
    this.selectedIndex = 0;
  }

  getHsl(hsl: number[], rounded: boolean = false){
    if(rounded){ 
      hsl = hsl.map(Math.round);
    }
    return 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)';
  }

}
