import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ChessComponent }   from './chess.component';
import { ChessGameComponent } from './chess-game/chess-game.component';
import { ChessGameService } from './chess-game.service';

import { routing } from './chess.routing';
import { ChessBoardComponent } from './chess-game/chess-board/chess-board.component';
import { ChessInstructionsComponent } from './chess-game/chess-instructions/chess-instructions.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [routing, SharedModule, CommonModule],
  exports: [],
  declarations: [ChessComponent, ChessGameComponent, ChessBoardComponent, ChessInstructionsComponent],
  providers: [ChessGameService],
})
export class ChessModule { }
