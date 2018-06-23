import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookiePolicyComponent } from './cookie-policy.component';
import { routing } from './cookie-policy.routing';


@NgModule({
  imports: [CommonModule, routing],
  exports: [],
  declarations: [CookiePolicyComponent],
  providers: []
})
export class CookiePolicyModule { }
