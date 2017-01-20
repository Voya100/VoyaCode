import { Component, OnInit } from '@angular/core';

import { Project, projectList} from '../shared/data/projects'

@Component({
  moduleId: module.id,
  templateUrl: 'projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor() {
    this.projects = projectList;
   }

  ngOnInit() { }
}