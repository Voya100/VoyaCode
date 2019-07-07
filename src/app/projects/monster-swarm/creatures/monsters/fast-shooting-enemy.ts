import { MachineGun } from '../../weapons/machine-gun';

import { FastEnemy } from './fast-enemy';

export class FastShootingEnemy extends FastEnemy {
  constructor() {
    super();
    this.points = 10;
    this.money = 10;
    this.weapon = new MachineGun({
      color: 'red'
    });
  }
}
