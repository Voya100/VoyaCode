import { Shotgun } from '../../weapons/shotgun';

import { Boss } from './boss';

export class Boss1 extends Boss {
  constructor() {
    super({
      color: 'purple',
      health: 30,
      damage: 1,
      knockbackPower: 100,
      knockbackResistance: 50,
      maxSpeed: 20,
      radius: 40,
      points: 200,
      money: 200
    });
    this.weapon = new Shotgun({
      color: 'red',
      spreadAngle: Math.PI,
      bullets: 20
    });
  }
}
