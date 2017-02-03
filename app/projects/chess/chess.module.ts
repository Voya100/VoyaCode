import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ChessComponent }   from './chess.component';
import { routing } from './chess.routing';

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [ChessComponent],
  providers: [],
})
export class ChessModule { }
