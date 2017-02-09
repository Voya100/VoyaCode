import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ChessComponent }   from './chess.component';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { ChessGameService } from './chess-game.service';

import { routing } from './chess.routing';

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [ChessComponent, ChessGameComponent],
  providers: [],
})
export class ChessModule { }
