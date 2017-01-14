import { NgModule } from '@angular/core';

import { ProjectsComponent }   from './projects.component';
import { routing } from './projects.routing';

@NgModule({
  imports: [routing],
  exports: [],
  declarations: [ProjectsComponent],
  providers: [],
})
export class ProjectsModule { }
