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

import { ChessMultiplayerComponent } from './chess-game/chess-multiplayer/chess-multiplayer.component';
import { ChessLobbyComponent } from './chess-game/chess-multiplayer/chess-lobby/chess-lobby.component';
// tslint:disable-next-line:max-line-length
import { ChessChallengeReceivedComponent } from './chess-game/chess-multiplayer/chess-challenge-received/chess-challenge-received.component';
import { ChessChallengeSentComponent } from './chess-game/chess-multiplayer/chess-challenge-sent/chess-challenge-sent.component';
import { ChessBoardLayoutComponent } from './chess-game/chess-multiplayer/chess-board-layout/chess-board-layout.component';

import { routing } from './chess.routing';

@NgModule({
  imports: [routing, SharedModule, CommonModule, FormsModule],
  exports: [],
  declarations: [
    ChessComponent, ChessGameComponent, ChessBoardComponent, ChessInstructionsComponent, 
    ChessSettingsComponent, ChessChooseModeComponent, ChessWinnerDialogComponent, 
    ChessMultiplayerComponent, ChessLobbyComponent, ChessChallengeReceivedComponent, ChessChallengeSentComponent, ChessBoardLayoutComponent
  ],
  providers: [ChessGameService, ChessSettingsService, ChessWebsocketService]
})
export class ChessModule { }
