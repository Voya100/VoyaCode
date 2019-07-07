import { Enemy } from './enemy';

export class FastEnemy extends Enemy {
  constructor() {
    super({
      color: 'lightgreen',
      health: 4,
      damage: 1,
      knockbackPower: 40,
      knockbackResistance: 5,
      maxSpeed: 100,
      radius: 8,
      points: 3,
      money: 3
    });
  }
}
