import { CollideableObject } from '../creatures/creatures.interfaces';
import { MovingObject } from '../creatures/moving-object';

import { ProjectileConfig } from './weapons.interfaces';

// A projectile/bullet that travels through the air
// Will disappear after collision
// Config can be used to 'override' other settings
export class Projectile extends MovingObject implements CollideableObject {
  damage: number;
  knockbackPower: number;

  constructor({ x, y, damage, knockbackPower, speed, angle, color, radius }: ProjectileConfig) {
    const maxSpeed = speed;
    super({
      x,
      y,
      acceleration: 0,
      maxSpeed,
      color,
      radius
    });
    this.xSpeed = Math.cos(angle) * maxSpeed;
    this.ySpeed = Math.sin(angle) * maxSpeed;
    this.damage = damage;
    this.knockbackPower = knockbackPower;
  }

  collide(obj: CollideableObject) {
    this.isExpired = true;
  }

  move(time: number) {
    if (this.isOutsideGameArea(this.radius)) {
      this.isExpired = true;
    }
    super.move(time);
  }

  isOutsideGameArea(radius: number): boolean {
    throw new Error('Method not implemented.');
  }

  static get radius(): number {
    throw new Error('Method not implemented.');
  }
}
