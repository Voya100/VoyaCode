import { Component, OnInit, Input } from '@angular/core';
import { SnowSettings } from '../snow-settings/snow-settings'

@Component({
  selector: 'form-row',
  templateUrl: 'form-row.component.html',
  styleUrls: ['form-row.component.css']
})
export class FormRowComponent{
  @Input() settings: SnowSettings;
  @Input() name: string;
  @Input() id: string;
  @Input() description: string;
  @Input() step: number;
  
  min: any = () => this.settings.min_values[this.id]();
  max: any = () => this.settings.max_values[this.id]();

  valid(): boolean{
      return this.min() <= this.settings[this.id] && 
             this.settings[this.id] <= this.max();
  }
}
