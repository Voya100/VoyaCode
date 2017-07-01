import { Component, OnInit } from '@angular/core';

import { Project, projectList } from '../../shared/data/projects'

// Banner component goes shows all project banners one at a time.
// Banner changes project automatically every 5 seconds.
// User can alternatively select which banner is shown.

@Component({
  selector: 'banner',
  templateUrl: 'banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  projects: Project[];
  len: number;
  id: number = 0;
  auto: boolean = false;

  constructor() { 
    this.projects = projectList.filter((o) => o.onBanner);
    this.len = this.projects.length;
  }

  ngOnInit() { 
    this.autoChange(6000);
  }

  // Changes banner automatically, if it hasn't been changed manually since last auto change
  autoChange(time: number){
    if(this.auto){
      this.change(this.id + 1);
    }else{
      this.auto = true;
    }
    setTimeout(() => {
      this.autoChange(5000);
    }, time);
  }

  // Changes active project to id.
  // Negative id values are changed to last element.
  // Modulo is used when id value is too high.
  // Manual changes prevent 1 automatic change.
  change(id: number, manual: boolean = false){
    if(manual){
      this.auto = false;
    }
    this.id = id < 0 ? this.len - 1 : id % this.len;
  }
  
}
