import { Component, OnInit } from '@angular/core';

import { SnowControlService } from './snow-control.service'
import { SnowSettings } from './snow-settings';

@Component({
  moduleId: module.id,
  selector: 'snow-settings',
  templateUrl: './snow-settings.component.html',
  providers: [SnowControlService, SnowSettings]
})
export class SnowSettingsComponent {

  private settings: SnowSettings;
  
  constructor(private snow_controller: SnowControlService){

    this.settings = this.snow_controller.settings;
  }

  ngOnInit() {
    this.snow_controller.createFlakes();
    this.snow_controller.moveRain();
   }

   

}