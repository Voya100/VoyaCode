import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { DescriptionBoxComponent }   from '../shared/description-box.component';
import { FormRowComponent } from './form-row/form-row.component'
import { SnowMachineComponent }   from './snow-machine.component';
import { SnowSettingsComponent }   from './snow-settings/snow-settings.component';

import { SnowControlService } from './snow-control.service'

// This module contains all components and dependencies needed by Snow Machine APP
// Made by Voya @ www.voyacode.com

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [DescriptionBoxComponent, FormRowComponent, SnowMachineComponent, SnowSettingsComponent],
  exports: [DescriptionBoxComponent, FormRowComponent, SnowMachineComponent, SnowSettingsComponent]
})
export class SnowMachineModule { }
