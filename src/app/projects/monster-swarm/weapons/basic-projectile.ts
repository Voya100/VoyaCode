import { Projectile } from './projectile';
import { ProjectileConfig } from './weapons.interfaces';

export class BasicProjectile extends Projectile {
  constructor(projectileConfig: ProjectileConfig) {
    super({
      x: projectileConfig.x,
      y: projectileConfig.y,
      damage: 1,
      knockbackPower: 30,
      speed: 50,
      angle: projectileConfig.angle,
      color: 'yellow',
      radius: 5,
      ...projectileConfig
    });
  }

  static get radius() {
    return 5;
  }
}
