import { NgModule } from '@angular/core';

import { CommentsComponent }   from './comments.component';
import { routing } from './comments.routing';

@NgModule({
  imports: [routing],
  exports: [],
  declarations: [CommentsComponent],
  providers: [],
})
export class CommentsModule { }
