import {AfterViewInit, Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { FormRowComponent } from '../form-row/form-row.component'
import { SnowControlService } from '../snow-control.service'
import { SnowSettings } from './snow-settings';


@Component({
  moduleId: module.id,
  selector: 'snow-settings',
  templateUrl: './snow-settings.component.html',
  styleUrls: ['./snow-settings.component.css', '../form-row/form-row.component.css'],
  providers: [SnowControlService, SnowSettings]
})
export class SnowSettingsComponent {

  @ViewChildren(FormRowComponent) formRowsQuery: QueryList<FormRowComponent>;

  private formRows: FormRowComponent[];
  private settings: SnowSettings;
  
  constructor(private snow_controller: SnowControlService){

    this.settings = this.snow_controller.settings;
  }

  ngOnInit() {
    this.snow_controller.createFlakes();
    this.snow_controller.moveRain();
   }

   ngAfterViewInit(){
     this.formRows = this.formRowsQuery.toArray();
   }

   // Reset snow and apply new settings, if all new settings are valid.
   reset(){
     if(this.formRows.every((row) => row.valid())){
      this.snow_controller.reset(this.settings);
     }
   }

   

}