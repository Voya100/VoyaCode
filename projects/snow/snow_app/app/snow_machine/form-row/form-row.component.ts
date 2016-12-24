import { Component, OnInit, Input } from '@angular/core';
import { SnowSettings } from '../snow-settings/snow-settings'

@Component({
  moduleId: module.id,
  selector: 'form-row',
  templateUrl: 'form-row.component.html',
  styleUrls: ['form-row.component.css']
})
export class FormRowComponent{
  @Input() private settings: SnowSettings;
  @Input() private name: string;
  @Input() private id: string;
  @Input() private description: string;
  @Input() private step: number;
  
  private min = () => this.settings.min_values[this.id]();
  private max = () => this.settings.max_values[this.id]();

  valid(): boolean{
      return this.min() <= this.settings[this.id] && 
             this.settings[this.id] <= this.max();
  }
}
