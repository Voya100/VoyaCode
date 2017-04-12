import { RockPaperScissorsGameComponent } from './rock-paper-scissors-game/rock-paper-scissors-game.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { RockPaperScissorsComponent }   from './rock-paper-scissors.component';
import { routing } from './rock-paper-scissors.routing';
import { RpsGameAreaComponent } from './rock-paper-scissors-game/rps-game-area/rps-game-area.component';
import { RpsMenuComponent } from './rock-paper-scissors-game/rps-menu/rps-menu.component';

// NOTE: This is a very old project of mine (first one I ever made), so the code is very badly outdated, and in Finnish.
// The project is made with ordinary Javascript. I plan to rewrite the code in near future, but as a temporary solution
// I'm including it in angular version of the page with iframe

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [RockPaperScissorsComponent, RockPaperScissorsGameComponent, RpsGameAreaComponent, RpsMenuComponent],
  providers: [],
})
export class RockPaperScissorsModule { }
