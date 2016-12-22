import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'description-box',
  templateUrl: './description-box.component.html'
})
export class DescriptionBoxComponent {
  @Input() text: string;
}