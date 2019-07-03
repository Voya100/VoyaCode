import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@voyacode/shared/shared.module';

import { MonsterSwarmGameComponent } from './monster-swarm-game/monster-swarm-game.component';
import { MonsterSwarmComponent } from './monster-swarm.component';
import { routing } from './monster-swarm.routing';

@NgModule({
  declarations: [MonsterSwarmComponent, MonsterSwarmGameComponent],
  imports: [CommonModule, SharedModule, FormsModule, CommonModule, routing]
})
export class MonsterSwarmModule {}
