import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { routing } from './admin.routing';

@NgModule({
  imports: [routing],
  exports: [],
  declarations: [AdminComponent],
  providers: []
})
export class AdminModule {}
