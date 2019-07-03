/* eslint no-unused-vars: "off" */
/* global BasicWeapon, MachineGun, Shotgun */

/**
 * MovingObject represents an object that can move in xy space.
 * Player, enemies and projectiles are children of MovingObject.
 * Objects can collide with each other, and have round shape by default.
 * All objects have a paint method which can be used to paint the object.
 * Many of the methods can be appended or replaced by child classes.
 */
class MovingObject{
  constructor({ x, y, acceleration, maxSpeed, color, radius }){
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

  get speed(){
    return Math.sqrt((this.xSpeed ** 2) + (this.ySpeed ** 2));
  }

  move(time){
    this.x += this.xSpeed * time;
    this.y += this.ySpeed * time;
  }

  changeDirection(xSpeed, ySpeed){
    this.xSpeed += xSpeed;
    this.ySpeed += ySpeed;

    const totalSpeed = this.speed;

    if(totalSpeed > this.maxSpeed){
      const speedRatio = this.maxSpeed / totalSpeed;
      this.xSpeed *= speedRatio;
      this.ySpeed *= speedRatio;
    }
  }

  isColliding(obj){
    const distance = Math.sqrt((this.x - obj.x) ** 2 + (this.y - obj.y) ** 2);
    return distance < this.radius + obj.radius;
  }

  isOutsideGameArea(distance){
    const size = 500;
    return this.x < -distance || this.x > size + distance || this.y < -distance || this.y > size + distance;
  }

  paint(context){
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

/**
 * Creatures (player + enemies) are objects which have health and possibly a weapon
 */
class Creature extends MovingObject{
  constructor({ health, damage, knockbackPower, knockbackResistance }, moveProperties){
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

  shoot(time){
    if(this.weapon){
      return this.weapon.shoot(time, this, this.weaponAngle);
    }
    return [];
  }

  // Sets weapon direction to given coordinates
  setWeaponDirection({ x, y }){
    this.weaponAngle = Math.atan2(y - this.y, x - this.x);
  }

  takeDamage(damage){
    this.health = Math.max(0, this.health - damage);
  }

  move(time){
    const { x, y } = this.moveDirection;
    this.changeDirection(x * this.acceleration, y * this.acceleration);
    if(x === 0){
      this.xSpeed *= this.decelerationRate;
    }
    if(y === 0){
      this.ySpeed *= this.decelerationRate;
    }
    super.move(time);
  }

  collide(obj){
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
  getDirectionVector(x, y){
    const xDelta = x - this.x;
    const yDelta = y - this.y;
    const distance = Math.sqrt(xDelta ** 2 + yDelta ** 2);
    return { x: xDelta / distance, y: yDelta / distance };
  }

  paint(context){
    if(this.weapon){
      this.weapon.paint(context, this, this.weaponAngle);
    }
    super.paint(context);
  }
}

class Player extends Creature{
  constructor(health, speed){
    super({
      health,
      damage: 1,
      knockbackPower: 30,
      knockbackResistance: 10
    }, {
      x: 250,
      y: 250,
      maxSpeed: speed,
      acceleration: 50,
      angle: 0,
      color: 'lightblue',
      radius: 10
    });
    this.maxHealth = health;
    this.weapon = undefined;
  }

  // Move from user input
  // Possible values for x and y: [-1, 0, 1]
  moveToDirection({ x, y }){
    if(x && y){
      this.moveDirection = { x: x * Math.SQRT2, y: y * Math.SQRT2 };
    }else{
      this.moveDirection = { x, y };
    }
  }

  move(time){
    super.move(time);

    // Prevent player from going outside the game area
    if(this.x < this.radius){
      this.x = this.radius;
      this.xSpeed *= -0.5;
    }else if(this.x + this.radius > 500){
      this.x = 500 - this.radius;
      this.xSpeed *= -0.5;
    }
    if(this.y < this.radius){
      this.y = this.radius;
      this.ySpeed *= -0.5;
    }else if(this.y + this.radius > 500){
      this.y = 500 - this.radius;
      this.ySpeed *= -0.5;
    }
  }
}

class Enemy extends Creature{
  constructor({ color, health, damage, knockbackPower, knockbackResistance, maxSpeed, radius, points, money }){
    // Select random direction
    const directionAngle = Math.random() * 2 * Math.PI;
    const x = 250 + Math.cos(directionAngle) * 400;
    const y = 250 + Math.sin(directionAngle) * 400;
    super({
      health,
      damage,
      knockbackPower,
      knockbackResistance
    }, {
      x,
      y,
      maxSpeed,
      acceleration: 50,
      color,
      radius
    });
    this.money = money;
    this.points = points;
  }

  move(time, direction){
    // Move towards given coordinates (often the player's)
    const { x, y } = direction;
    this.moveDirection = this.getDirectionVector(x, y);
    super.move(time);
  }

  shoot(time, target){
    if(this.weapon){
      this.setWeaponDirection({ x: target.x, y: target.y });
    }
    return super.shoot(time);
  }

  collide(obj){
    super.collide(obj);
    if(this.health <= 0){
      this.isExpired = true;
    }
  }

  paint(context){
    if(!this.isOutsideGameArea(this.radius)){
      super.paint(context);
    }
  }
}

class BasicEnemy extends Enemy{
  constructor(){
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

class MediumEnemy extends Enemy{
  constructor(){
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

class FastEnemy extends Enemy{
  constructor(){
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

class BasicShootingEnemy extends BasicEnemy{
  constructor(){
    super();
    this.maxSpeed = 30;
    this.points = 6;
    this.money = 6;
    this.weapon = new BasicWeapon({
      color: 'red',
      rate: 0.25
    });
  }
}

class MediumShootingEnemy extends MediumEnemy{
  constructor(){
    super();
    this.maxSpeed = 20;
    this.points = 12;
    this.money = 12;
    this.weapon = new Shotgun({
      color: 'red',
      rate: 0.2
    });
  }
}

class FastShootingEnemy extends FastEnemy{
  constructor(){
    super();
    this.points = 10;
    this.money = 10;
    this.weapon = new MachineGun({
      color: 'red'
    });
  }
}

class TowerEnemy extends Enemy{
  constructor(){
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

// Abstract
class Boss extends Enemy{
  move(time, player){
    super.move(time, { x: 250, y: 250 });
  }
}

class Boss1 extends Boss{
  constructor(){
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
