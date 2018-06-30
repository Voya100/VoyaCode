import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { FormRowComponent } from './form-row/form-row.component';
import { SnowControlService } from './snow-control.service';
import { SnowMachineComponent } from './snow-machine.component';
import { routing } from './snow-machine.routing';
import { SnowSettingsComponent } from './snow-settings/snow-settings.component';

@NgModule({
  imports: [CommonModule, FormsModule, routing, SharedModule],
  exports: [],
  declarations: [SnowMachineComponent, SnowSettingsComponent, FormRowComponent],
  providers: [SnowControlService]
})
export class SnowMachineModule {}
