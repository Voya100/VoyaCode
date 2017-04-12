import { RockPaperScissorsGameComponent } from './rock-paper-scissors-game/rock-paper-scissors-game.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { RockPaperScissorsComponent }   from './rock-paper-scissors.component';
import { routing } from './rock-paper-scissors.routing';
import { RpsGameAreaComponent } from './rock-paper-scissors-game/rps-game-area/rps-game-area.component';
import { RpsMenuComponent } from './rock-paper-scissors-game/rps-menu/rps-menu.component';
import { RpsUsernameComponent } from './rock-paper-scissors-game/rps-menu/rps-username/rps-username.component';
import { RpsGameLogicService } from './rps-game-logic.service';

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [RockPaperScissorsComponent, RockPaperScissorsGameComponent, RpsGameAreaComponent, RpsMenuComponent, RpsUsernameComponent],
  providers: [RpsGameLogicService],
})
export class RockPaperScissorsModule { }
