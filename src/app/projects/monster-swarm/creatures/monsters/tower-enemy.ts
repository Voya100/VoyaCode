import { Shotgun } from '../../weapons/shotgun';

import { Enemy } from './enemy';

export class TowerEnemy extends Enemy {
  constructor() {
    super({
      color: 'crimson',
      health: 15,
      damage: 1,
      knockbackPower: 50,
      knockbackResistance: 30,
      maxSpeed: 20,
      radius: 12,
      points: 50,
      money: 50
    });
    this.weapon = new Shotgun({
      color: 'red',
      spreadAngle: 2 * Math.PI,
      bullets: 20,
      rate: 0.2
    });
  }
}
