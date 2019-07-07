import { BasicWeapon } from '../../weapons/basic-weapon';

import { BasicEnemy } from './basic-enemy';

export class BasicShootingEnemy extends BasicEnemy {
  constructor() {
    super();
    this.maxSpeed = 30;
    this.points = 6;
    this.money = 6;
    this.weapon = new BasicWeapon({
      color: 'red',
      rate: 0.25
    });
  }
}
