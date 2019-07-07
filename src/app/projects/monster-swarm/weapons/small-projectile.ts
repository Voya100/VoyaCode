import { Projectile } from './projectile';
import { ProjectileConfig } from './weapons.interfaces';

export class SmallProjectile extends Projectile {
  constructor(projectileConfig: ProjectileConfig) {
    super({
      x: projectileConfig.x,
      y: projectileConfig.y,
      damage: 1,
      knockbackPower: 10,
      speed: 50,
      angle: projectileConfig.angle,
      color: 'khaki',
      radius: 3,
      ...projectileConfig
    });
  }

  static get radius() {
    return 3;
  }
}
