import { Weapon } from '../weapons/weapon';

import { Creature } from './creature';
import { Coordinate, MoveDirection } from './creatures.interfaces';

export class Player extends Creature {
  static readonly HEALTH_PROPERTY = 'health';
  static readonly SPEED_PROPETY = 'speed';

  maxHealth: number;
  weapon: Weapon;
  moveDirection: MoveDirection;

  constructor(health: number, speed: number) {
    super(
      {
        health,
        damage: 1,
        knockbackPower: 30,
        knockbackResistance: 10
      },
      {
        x: 250,
        y: 250,
        maxSpeed: speed,
        acceleration: 50,
        color: 'lightblue',
        radius: 10
      }
    );
    this.maxHealth = health;
    this.weapon = undefined;
  }

  // Move from user input
  // Possible values for x and y: [-1, 0, 1]
  moveToDirection({ x, y }: Coordinate) {
    if (x && y) {
      this.moveDirection = { x: x * Math.SQRT2, y: y * Math.SQRT2 };
    } else {
      this.moveDirection = { x, y };
    }
  }

  move(time: number) {
    super.move(time);

    // Prevent player from going outside the game area
    if (this.x < this.radius) {
      this.x = this.radius;
      this.xSpeed *= -0.5;
    } else if (this.x + this.radius > 500) {
      this.x = 500 - this.radius;
      this.xSpeed *= -0.5;
    }
    if (this.y < this.radius) {
      this.y = this.radius;
      this.ySpeed *= -0.5;
    } else if (this.y + this.radius > 500) {
      this.y = 500 - this.radius;
      this.ySpeed *= -0.5;
    }
  }
}
