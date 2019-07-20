import { SmallProjectile } from './small-projectile';
import { Weapon } from './weapon';
import { WeaponConfig } from './weapons.interfaces';

// Shoots single projectiles at fast rate
export class MachineGun extends Weapon {
  static readonly WEAPON_NAME = 'Machine gun';

  constructor(weaponConfig: WeaponConfig) {
    weaponConfig.barrelColor = weaponConfig.barrelColor || 'khaki';
    super([{ Projectile: SmallProjectile, angle: 0, projectileAngle: 0 }], 2, weaponConfig);
  }
}
