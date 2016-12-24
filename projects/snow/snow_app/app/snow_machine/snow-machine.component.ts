import { Component, Input } from '@angular/core';
import {SnowControlService} from './snow-control.service'

@Component({
  moduleId: module.id,
  selector: 'snow-machine',
  templateUrl: './snow-machine.component.html',
  styleUrls: ['./snow-machine.component.css'],
  providers: [SnowControlService]
})
export class SnowMachineComponent {
}