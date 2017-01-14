import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'main-footer',
  templateUrl: 'main-footer.component.html',
  styleUrls: ['./main-footer.component.css']
})
export class MainFooterComponent implements OnInit {
  year: number;
  constructor() { 
    this.year = new Date().getFullYear();
  }

  ngOnInit() { }
}