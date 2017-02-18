import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ChessComponent }   from './chess.component';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { ChessGameService } from './chess-game.service';

import { routing } from './chess.routing';
import { ChessBoardComponent } from './chess-game/chess-board/chess-board.component';
import { ChessInstructionsComponent } from './chess-game/chess-instructions/chess-instructions.component';

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [ChessComponent, ChessGameComponent, ChessBoardComponent, ChessInstructionsComponent],
  providers: [],
})
export class ChessModule { }
