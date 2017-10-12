import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ChessComponent } from './chess.component';
import { ChessGameComponent } from './chess-game/chess-game.component';

import { ChessGameService } from './logic/services/chess-game.service';
import { ChessSettingsService } from './logic/services/chess-settings.service';
import { ChessWebsocketService } from './logic/services/chess-websocket.service';

import { ChessBoardComponent } from './chess-game/chess-board/chess-board.component';
import { ChessInstructionsComponent } from './chess-game/chess-instructions/chess-instructions.component';
import { ChessSettingsComponent } from './chess-game/chess-settings/chess-settings.component';
import { ChessChooseModeComponent } from './chess-game/chess-choose-mode/chess-choose-mode.component';
import { ChessWinnerDialogComponent } from './chess-game/chess-winner-dialog/chess-winner-dialog.component';
import { ChessLobbyComponent } from './chess-game/chess-lobby/chess-lobby.component';

import { routing } from './chess.routing';

@NgModule({
  imports: [routing, SharedModule, CommonModule, FormsModule],
  exports: [],
  declarations: [
    ChessComponent, ChessGameComponent, ChessBoardComponent, ChessInstructionsComponent, 
    ChessSettingsComponent, ChessChooseModeComponent, ChessWinnerDialogComponent, ChessLobbyComponent
  ],
  providers: [ChessGameService, ChessSettingsService, ChessWebsocketService]
})
export class ChessModule { }
