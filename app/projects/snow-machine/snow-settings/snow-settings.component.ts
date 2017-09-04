import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';

import { FormRowComponent } from '../form-row/form-row.component'
import { SnowControlService } from '../snow-control.service'
import { SnowSettings } from './snow-settings';

// This component contains all input fields which will alter settings of SnowControlService.
// This component also has a button to apply these changes, assuming that all inputs are valid
// (= are in certain value range) and will initialise snow effect.
// Changes to FPS setting are applied immediately.

@Component({
  selector: 'snow-settings',
  templateUrl: './snow-settings.component.html',
  styleUrls: ['./snow-settings.component.css', '../form-row/form-row.component.scss'],
  providers: [SnowControlService, SnowSettings]
})
export class SnowSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormRowComponent) formRowsQuery: QueryList<FormRowComponent>;

  settings: SnowSettings;
  
  private formRows: FormRowComponent[];
  
  constructor(private snow_controller: SnowControlService){
    this.settings = this.snow_controller.settings;
  }

  // Creates snow/rain effect
  ngOnInit() {
    this.snow_controller.createFlakes();
    this.snow_controller.moveRain();
   }

   // Destroy flakes after page is closed
   ngOnDestroy(){
     this.snow_controller.deleteFlakes();
   }

   // Gets row components so that their valid() method can be checked
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
