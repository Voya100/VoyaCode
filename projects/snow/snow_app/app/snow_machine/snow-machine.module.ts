import { NgModule } from '@angular/core';

import { DescriptionBoxComponent }   from '../shared/description-box.component';
import { SnowMachineComponent }   from './snow-machine.component';
import { SnowSettingsComponent }   from './snow-settings.component';

import { SnowControlService } from './snow-control.service'

@NgModule({
  imports: [],
  declarations: [DescriptionBoxComponent, SnowMachineComponent, SnowSettingsComponent],
  exports: [DescriptionBoxComponent, SnowMachineComponent, SnowSettingsComponent]
})
export class SnowMachineModule { }
