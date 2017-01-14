import { NgModule } from '@angular/core';

import { BlogsComponent }   from './blogs.component';
import { routing } from './blogs.routing';

@NgModule({
  imports: [routing],
  exports: [],
  declarations: [BlogsComponent],
  providers: [],
})
export class BlogsModule { }
