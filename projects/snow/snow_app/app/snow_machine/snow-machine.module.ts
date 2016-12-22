import { NgModule } from '@angular/core';

import { DescriptionBoxComponent }   from '../shared/description-box.component';
import { SnowMachineComponent }   from './snow-machine.component';
import { SnowSettingsComponent }   from './snow-settings.component';


@NgModule({
  imports: [],
  declarations: [DescriptionBoxComponent, SnowMachineComponent, SnowSettingsComponent],
  exports: [DescriptionBoxComponent, SnowMachineComponent, SnowSettingsComponent],
  providers: [],
})
export class SnowMachineModule { }
