import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'description-box',
  templateUrl: './description-box.component.html',
  styleUrls: ['./description-box.component.css']
})
export class DescriptionBoxComponent {
  @Input() text: string;
}