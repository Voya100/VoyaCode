import { Component, OnInit } from '@angular/core';

import { Project, projectList } from '../shared/data/projects'

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor() {
    this.projects = projectList;
   }

  ngOnInit() { }
}
