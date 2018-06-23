import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-footer',
  templateUrl: 'main-footer.component.html',
  styleUrls: ['./main-footer.component.scss']
})
export class MainFooterComponent {
  year: number;
  constructor() {
    this.year = new Date().getFullYear();
  }
}
