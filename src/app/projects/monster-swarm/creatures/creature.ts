import { Weapon } from '../weapons/weapon';

import {
  CollideableObject,
  Coordinate,
  CreatureProperties,
  MoveDirection,
  MoveProperties
} from './creatures.interfaces';
import { MovingObject } from './moving-object';
/**
 * Creatures (player + enemies) are objects which have health and possibly a weapon
 */
export class Creature extends MovingObject {
  health: number;
  damage: number;
  knockbackPower: number;
  knockbackResistance: number;
  decelerationRate: number;
  moveDirection: MoveDirection;
  weapon?: Weapon;
  weaponAngle: number;

  constructor(
    { health, damage, knockbackPower, knockbackResistance }: CreatureProperties,
    moveProperties: MoveProperties
  ) {
    super(moveProperties);
    this.health = health;

    // Inlicted collision damage
    this.damage = damage;

    this.knockbackPower = knockbackPower;
    this.knockbackResistance = knockbackResistance;
    this.decelerationRate = 0.5;
    this.moveDirection = {
      x: 0,
      y: 0
    };
    this.weapon = undefined;
    this.weaponAngle = 0;
  }

  shoot(time: number, target?: Coordinate) {
    if (this.weapon) {
      return this.weapon.shoot(time, this, this.weaponAngle);
    }
    return [];
  }

  // Sets weapon direction to given coordinates
  setWeaponDirection({ x, y }: Coordinate) {
    this.weaponAngle = Math.atan2(y - this.y, x - this.x);
  }

  takeDamage(damage: number) {
    this.health = Math.max(0, this.health - damage);
  }

  move(time: number, direction?: MoveDirection) {
    const { x, y } = this.moveDirection;
    this.changeDirection(x * this.acceleration, y * this.acceleration);
    if (x === 0) {
      this.xSpeed *= this.decelerationRate;
    }
    if (y === 0) {
      this.ySpeed *= this.decelerationRate;
    }
    super.move(time);
  }

  collide(obj: CollideableObject) {
    this.xSpeed *= 0.5;
    this.ySpeed *= 0.5;

    const direction = this.getDirectionVector(obj.x, obj.y);
    const knockback = Math.max(obj.knockbackPower - this.knockbackResistance, 2);
    this.x -= direction.x * knockback;
    this.y -= direction.y * knockback;
    this.xSpeed -= direction.x * 5000;
    this.ySpeed -= direction.y * 5000;
    this.takeDamage(obj.damage);
  }

  // Returns direction vector between current location and given coordinates
  getDirectionVector(x: number, y: number) {
    const xDelta = x - this.x;
    const yDelta = y - this.y;
    const distance = Math.sqrt(xDelta ** 2 + yDelta ** 2);
    return { x: xDelta / distance, y: yDelta / distance };
  }

  paint(context: CanvasRenderingContext2D) {
    if (this.weapon) {
      this.weapon.paint(context, this, this.weaponAngle);
    }
    super.paint(context);
  }
}
