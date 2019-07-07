import { BasicProjectile } from './basic-projectile';
import { Weapon } from './weapon';
import { WeaponConfig } from './weapons.interfaces';

// Shoots single projectiles at slow rate
export class BasicWeapon extends Weapon {
  constructor(weaponConfig: WeaponConfig) {
    super([{ Projectile: BasicProjectile, angle: 0, projectileAngle: 0 }], 0.5, weaponConfig);
  }
}
