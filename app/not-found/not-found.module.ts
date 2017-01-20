import { NgModule } from '@angular/core';

import { NotFoundComponent }   from './not-found.component';
import { routing } from './not-found.routing';

@NgModule({
  imports: [routing],
  exports: [],
  declarations: [NotFoundComponent],
  providers: [],
})
export class NotFoundModule { }
