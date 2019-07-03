/* global MovingObject */
/* eslint no-unused-vars: "off" */
/* eslint no-use-before-define: "off" */

/**
 * Weapon shoots 1 or more projectiles at certain intervals
 * weaponConfig can be used to override settings, and those will also be given
 * to bullets created by the weapon
 */
class Weapon{
  // projectiles: [{Projectile, angle, projectileAngle}]
  constructor(projectiles, shootingRate, weaponConfig = {}){
    this.projectiles = projectiles;
    this.setShootingRate(weaponConfig.rate || shootingRate);
    this.timer = 0;
    this.weaponConfig = weaponConfig;
    this.barrelColor = weaponConfig.barrelColor || 'darkgray';
  }

  // shooting rate = projectiles / 1 s
  setShootingRate(shootingRate){
    this.shootingInterval = 1 / shootingRate;
  }

  // Returns projectiles that have been shot
  shoot(time, shooter, gunAngle){
    this.timer += time;
    if(this.timer < this.shootingInterval){
      return [];
    }
    this.timer -= this.shootingInterval;

    return this.projectiles.map(({ Projectile, angle, projectileAngle }) => {
      const shooterDistance = shooter.radius + Projectile.radius;
      const x = shooter.x + Math.cos(gunAngle + angle) * shooterDistance;
      const y = shooter.y + Math.sin(gunAngle + angle) * shooterDistance;
      return new Projectile(x, y, gunAngle + projectileAngle, this.weaponConfig);
    });
  }

  paint(context, shooter, angle){
    this.paintBarrel(context, shooter, angle);
  }

  // Paints a single gun barrel for the shooter at wanted angle
  paintBarrel(context, shooter, shooterAngle, {
    barrelAngle = 0,
    barrelLength = 10,
    color = this.barrelColor
  } = {}){
    const length = shooter.radius + barrelLength;
    const angle = shooterAngle + barrelAngle;
    const x = shooter.x + (Math.cos(angle) * length);
    const y = shooter.y + (Math.sin(angle) * length);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(shooter.x, shooter.y);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
  }
}

// Shoots single projectiles at slow rate
class BasicWeapon extends Weapon{
  constructor(weaponConfig){
    super([
      { Projectile: BasicProjectile, angle: 0, projectileAngle: 0 }
    ], 0.5, weaponConfig);
  }
}

// Shoots single projectiles at fast rate
class MachineGun extends Weapon{
  constructor(weaponConfig){
    weaponConfig.barrelColor = weaponConfig.barrelColor || 'khaki';
    super([
      { Projectile: SmallProjectile, angle: 0, projectileAngle: 0 }
    ], 2, weaponConfig);
  }
}

// Shoots multiple projectiles that are spread evenly on given spread angle
// The angle can be even 2 PI, in which case it will shoot in all directions
class Shotgun extends Weapon{
  constructor(weaponConfig){
    const projectileCount = weaponConfig.bullets || 3;
    const spreadAngle = weaponConfig.spreadAngle || Math.PI / 2;
    const projectiles = Shotgun.generateProjectiles(projectileCount, spreadAngle);

    super(projectiles, 0.5, weaponConfig);
    this.startAngle = -spreadAngle / 2;
    this.angleDifference = spreadAngle / (projectileCount - 1);
  }

  paint(context, shooter, shooterAngle){
    for(let i = 0; i < this.projectiles.length; i++){
      this.paintBarrel(context, shooter, shooterAngle, {
        barrelAngle: this.startAngle + i * this.angleDifference,
        color: 'orange'
      });
    }
  }

  static generateProjectiles(projectileCount, spreadAngle){
    const projectiles = [];
    const startAngle = -spreadAngle / 2;
    const angleDifference = spreadAngle / (projectileCount - 1);
    for(let i = 0; i < projectileCount; i++){
      const angle = startAngle + i * angleDifference;
      projectiles.push(
        { Projectile: BasicProjectile, angle, projectileAngle: angle }
      );
    }
    return projectiles;
  }
}

// A projectile/bullet that travels through the air
// Will disappear after collision
// Config can be used to 'override' other settings
class Projectile extends MovingObject{
  constructor({ x, y, damage, knockbackPower, speed, angle, color, radius }, config = {}){
    const maxSpeed = config.speed || speed;
    super({
      x,
      y,
      acceleration: 0,
      maxSpeed,
      color: config.color || color,
      radius: config.radius || radius
    });
    this.xSpeed = Math.cos(angle) * maxSpeed;
    this.ySpeed = Math.sin(angle) * maxSpeed;
    this.damage = config.damage || damage;
    this.knockbackPower = config.knockbackPower || knockbackPower;
  }

  collide(obj){
    this.isExpired = true;
  }

  move(time){
    if(this.isOutsideGameArea(this.radius)){
      this.isExpired = true;
    }
    super.move(time);
  }
}

class BasicProjectile extends Projectile{
  constructor(x, y, angle, projectileConfig){
    super({
      x,
      y,
      damage: 1,
      knockbackPower: 30,
      speed: 50,
      angle,
      color: 'yellow',
      radius: 5
    }, projectileConfig);
  }

  static get radius(){
    return 5;
  }
}

class SmallProjectile extends Projectile{
  constructor(x, y, angle, projectileConfig){
    super({
      x,
      y,
      damage: 1,
      knockbackPower: 10,
      speed: 50,
      angle,
      color: 'khaki',
      radius: 3
    }, projectileConfig);
  }

  static get radius(){
    return 3;
  }
}
