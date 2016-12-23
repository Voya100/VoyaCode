import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { DescriptionBoxComponent }   from '../shared/description-box.component';
import { FormRowComponent } from './form-row.component'
import { SnowMachineComponent }   from './snow-machine.component';
import { SnowSettingsComponent }   from './snow-settings.component';

import { SnowControlService } from './snow-control.service'

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DescriptionBoxComponent, FormRowComponent, SnowMachineComponent, SnowSettingsComponent],
  exports: [DescriptionBoxComponent, FormRowComponent, SnowMachineComponent, SnowSettingsComponent]
})
export class SnowMachineModule { }
