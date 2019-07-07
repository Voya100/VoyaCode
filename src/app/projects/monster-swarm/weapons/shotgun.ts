import { Creature } from '../creatures/creature';

import { BasicProjectile } from './basic-projectile';
import { Weapon } from './weapon';
import { WeaponConfig } from './weapons.interfaces';

// Shoots multiple projectiles that are spread evenly on given spread angle
// The angle can be even 2 PI, in which case it will shoot in all directions
export class Shotgun extends Weapon {
  startAngle: number;
  angleDifference: number;

  constructor(weaponConfig: WeaponConfig) {
    const projectileCount = weaponConfig.bullets || 3;
    const spreadAngle = weaponConfig.spreadAngle || Math.PI / 2;
    const projectiles = Shotgun.generateProjectiles(projectileCount, spreadAngle);

    super(projectiles, 0.5, weaponConfig);
    this.startAngle = -spreadAngle / 2;
    this.angleDifference = spreadAngle / (projectileCount - 1);
  }

  static generateProjectiles(projectileCount: number, spreadAngle: number) {
    const projectiles = [];
    const startAngle = -spreadAngle / 2;
    const angleDifference = spreadAngle / (projectileCount - 1);
    for (let i = 0; i < projectileCount; i++) {
      const angle = startAngle + i * angleDifference;
      projectiles.push({ Projectile: BasicProjectile, angle, projectileAngle: angle });
    }
    return projectiles;
  }

  paint(context: CanvasRenderingContext2D, shooter: Creature, shooterAngle: number) {
    for (let i = 0; i < this.projectiles.length; i++) {
      this.paintBarrel(context, shooter, shooterAngle, {
        barrelAngle: this.startAngle + i * this.angleDifference,
        color: 'orange'
      });
    }
  }
}
