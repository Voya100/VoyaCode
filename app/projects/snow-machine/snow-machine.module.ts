import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { SharedModule } from '../../shared/shared.module'

import { FormRowComponent } from './form-row/form-row.component'
import { SnowMachineComponent } from './snow-machine.component';
import { SnowSettingsComponent } from './snow-settings/snow-settings.component'
import { routing } from './snow-machine.routing';

import { SnowControlService } from './snow-control.service'

@NgModule({
  imports: [CommonModule, FormsModule, routing, SharedModule],
  exports: [],
  declarations: [SnowMachineComponent, SnowSettingsComponent, FormRowComponent],
  providers: [SnowControlService]
})
export class SnowMachineModule { }
