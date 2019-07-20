import { Projectile } from './projectile';

export interface ProjectileConfig {
  x?: number;
  y?: number;
  damage?: number;
  knockbackPower?: number;
  speed?: number;
  angle?: number;
  color?: string;
  radius?: number;
}

export interface ProjectileDefinition {
  angle: number;
  projectileAngle: number;
  Projectile: typeof Projectile;
}

export interface WeaponConfig {
  rate?: number;
  barrelColor?: string;
  bullets?: number;
  spreadAngle?: number;
  color?: string;
}

export const DAMAGE = 'damage';
export const SPEED = 'speed';
export const RATE = 'rate';
export const BULLETS = 'bullets';
