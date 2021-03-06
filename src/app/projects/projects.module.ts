import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProjectsComponent } from './projects.component';
import { routing } from './projects.routing';

@NgModule({
  imports: [CommonModule, routing],
  exports: [],
  declarations: [ProjectsComponent],
  providers: []
})
export class ProjectsModule {}
