import { Creature } from '../creature';
import { CollideableObject, Coordinate, MoveDirection } from '../creatures.interfaces';

export class Enemy extends Creature {
  money: number;
  points: number;

  constructor({ color, health, damage, knockbackPower, knockbackResistance, maxSpeed, radius, points, money }) {
    // Select random direction
    const directionAngle = Math.random() * 2 * Math.PI;
    const x = 250 + Math.cos(directionAngle) * 400;
    const y = 250 + Math.sin(directionAngle) * 400;
    super(
      {
        health,
        damage,
        knockbackPower,
        knockbackResistance
      },
      {
        x,
        y,
        maxSpeed,
        acceleration: 50,
        color,
        radius
      }
    );
    this.money = money;
    this.points = points;
  }

  move(time: number, direction: MoveDirection) {
    // Move towards given coordinates (often the player's)
    const { x, y } = direction;
    this.moveDirection = this.getDirectionVector(x, y);
    super.move(time);
  }

  shoot(time: number, target: Coordinate) {
    if (this.weapon) {
      this.setWeaponDirection({ x: target.x, y: target.y });
    }
    return super.shoot(time);
  }

  collide(obj: CollideableObject) {
    super.collide(obj);
    if (this.health <= 0) {
      this.isExpired = true;
    }
  }

  paint(context: CanvasRenderingContext2D) {
    if (!this.isOutsideGameArea(this.radius)) {
      super.paint(context);
    }
  }
}
