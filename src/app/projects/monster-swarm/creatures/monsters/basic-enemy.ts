import { Enemy } from './enemy';

export class BasicEnemy extends Enemy {
  constructor() {
    super({
      color: 'green',
      health: 3,
      damage: 1,
      knockbackPower: 30,
      knockbackResistance: 10,
      maxSpeed: 50,
      radius: 10,
      points: 1,
      money: 1
    });
  }
}
