import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { HangmanComponent } from './hangman.component';
import { routing } from './hangman.routing';

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [HangmanComponent],
  providers: []
})
export class HangmanModule { }
