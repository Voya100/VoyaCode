import { MoveProperties } from './creatures.interfaces';
/**
 * MovingObject represents an object that can move in xy space.
 * Player, enemies and projectiles are children of MovingObject.
 * Objects can collide with each other, and have round shape by default.
 * All objects have a paint method which can be used to paint the object.
 * Many of the methods can be appended or replaced by child classes.
 */
export class MovingObject {
  x: number;
  y: number;
  acceleration: number;
  xSpeed: number;
  ySpeed: number;
  maxSpeed: number;
  color: string;
  radius: number;
  isExpired: boolean;

  constructor({ x, y, acceleration, maxSpeed, color, radius }: MoveProperties) {
    this.x = x;
    this.y = y;
    this.acceleration = acceleration;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.maxSpeed = maxSpeed;
    this.color = color;
    this.radius = radius;
    this.isExpired = false;
  }

  get speed() {
    return Math.sqrt(this.xSpeed ** 2 + this.ySpeed ** 2);
  }

  move(time: number) {
    this.x += this.xSpeed * time;
    this.y += this.ySpeed * time;
  }

  changeDirection(xSpeed: number, ySpeed: number) {
    this.xSpeed += xSpeed;
    this.ySpeed += ySpeed;

    const totalSpeed = this.speed;

    if (totalSpeed > this.maxSpeed) {
      const speedRatio = this.maxSpeed / totalSpeed;
      this.xSpeed *= speedRatio;
      this.ySpeed *= speedRatio;
    }
  }

  isColliding(obj: MovingObject) {
    const distance = Math.sqrt((this.x - obj.x) ** 2 + (this.y - obj.y) ** 2);
    return distance < this.radius + obj.radius;
  }

  isOutsideGameArea(distance: number) {
    const size = 500;
    return this.x < -distance || this.x > size + distance || this.y < -distance || this.y > size + distance;
  }

  paint(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.shadowColor = 'black';
    context.shadowBlur = 1;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.fill();
    context.closePath();
  }
}
