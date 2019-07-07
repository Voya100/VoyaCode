import { Creature } from '../creatures/creature';
import { MovingObject } from '../creatures/moving-object';

import { ProjectileDefinition, WeaponConfig } from './weapons.interfaces';

/**
 * Weapon shoots 1 or more projectiles at certain intervals
 * weaponConfig can be used to override settings, and those will also be given
 * to bullets created by the weapon
 */
export class Weapon {
  projectiles: ProjectileDefinition[];
  timer: number;
  weaponConfig: WeaponConfig;
  barrelColor: string;
  shootingInterval: number;

  // projectiles: [{Projectile, angle, projectileAngle}]
  constructor(projectiles: ProjectileDefinition[], shootingRate: number, weaponConfig: WeaponConfig = {}) {
    this.projectiles = projectiles;
    this.setShootingRate(weaponConfig.rate || shootingRate);
    this.timer = 0;
    this.weaponConfig = weaponConfig;
    this.barrelColor = weaponConfig.barrelColor || 'darkgray';
  }

  // shooting rate = projectiles / 1 s
  setShootingRate(shootingRate: number) {
    this.shootingInterval = 1 / shootingRate;
  }

  // Returns projectiles that have been shot
  shoot(time: number, shooter: Creature, gunAngle: number) {
    this.timer += time;
    if (this.timer < this.shootingInterval) {
      return [];
    }
    this.timer -= this.shootingInterval;

    return this.projectiles.map(({ Projectile, angle, projectileAngle }) => {
      const shooterDistance = shooter.radius + Projectile.radius;
      const x = shooter.x + Math.cos(gunAngle + angle) * shooterDistance;
      const y = shooter.y + Math.sin(gunAngle + angle) * shooterDistance;
      return new Projectile({ x, y, angle: gunAngle + projectileAngle, ...this.weaponConfig });
    });
  }

  paint(context: CanvasRenderingContext2D, shooter: Creature, angle: number) {
    this.paintBarrel(context, shooter, angle);
  }

  // Paints a single gun barrel for the shooter at wanted angle
  paintBarrel(
    context: CanvasRenderingContext2D,
    shooter: Creature,
    shooterAngle: number,
    { barrelAngle = 0, barrelLength = 10, color = this.barrelColor } = {}
  ) {
    const length = shooter.radius + barrelLength;
    const angle = shooterAngle + barrelAngle;
    const x = shooter.x + Math.cos(angle) * length;
    const y = shooter.y + Math.sin(angle) * length;
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(shooter.x, shooter.y);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
  }
}
