import { Enemy } from './enemy';

export class MediumEnemy extends Enemy {
  constructor() {
    super({
      color: 'orange',
      health: 10,
      damage: 2,
      knockbackPower: 50,
      knockbackResistance: 20,
      maxSpeed: 40,
      radius: 14,
      points: 5,
      money: 5
    });
  }
}
