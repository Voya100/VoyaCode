import { NgModule } from '@angular/core';

import { OtherProjectsComponent }   from './other-projects.component';
import { routing } from './other-projects.routing';

@NgModule({
  imports: [routing],
  exports: [],
  declarations: [OtherProjectsComponent],
  providers: [],
})
export class OtherProjectsModule { }
