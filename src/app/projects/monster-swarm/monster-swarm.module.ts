import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@voyacode/shared/shared.module';

import { GameAreaComponent } from './game-area/game-area.component';
import { GameShopComponent } from './game-shop/game-shop.component';
import { GameUpgradeComponent } from './game-shop/game-upgrade/game-upgrade.component';
import { HiscoresComponent } from './hiscores/hiscores.component';
import { MonsterSwarmGameComponent } from './monster-swarm-game/monster-swarm-game.component';
import { MonsterSwarmComponent } from './monster-swarm.component';
import { routing } from './monster-swarm.routing';

@NgModule({
  declarations: [
    MonsterSwarmComponent,
    MonsterSwarmGameComponent,
    GameShopComponent,
    GameAreaComponent,
    GameUpgradeComponent,
    HiscoresComponent
  ],
  imports: [CommonModule, SharedModule, FormsModule, routing]
})
export class MonsterSwarmModule {}
