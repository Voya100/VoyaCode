import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { SlayTheDragonComponent }   from './slay-the-dragon.component';
import { routing } from './slay-the-dragon.routing';

// NOTE: This is a very old project of mine (second one I ever made), so the code is very badly outdated.
// The project is made with ordinary Javascript. I plan to rewrite the code in near future, but as a temporary solution
// I'm including it in angular version of the page with iframe

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [SlayTheDragonComponent],
  providers: [],
})
export class SlayTheDragonModule { }
