import { Shotgun } from '../../weapons/shotgun';

import { MediumEnemy } from './medium-enemy';

export class MediumShootingEnemy extends MediumEnemy {
  constructor() {
    super();
    this.maxSpeed = 20;
    this.points = 12;
    this.money = 12;
    this.weapon = new Shotgun({
      color: 'red',
      rate: 0.2
    });
  }
}
