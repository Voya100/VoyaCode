import { Player } from '../player';

import { Enemy } from './enemy';

// Abstract
export class Boss extends Enemy {
  move(time: number, player: Player) {
    super.move(time, { x: 250, y: 250 });
  }
}
