import { Projectile } from '../weapons/projectile';

import { MovingObject } from './moving-object';
export interface MoveDirection {
  x: number;
  y: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface MoveProperties {
  x: number;
  y: number;
  acceleration: number;
  maxSpeed: number;
  color: string;
  radius: number;
}

export interface CreatureProperties {
  health: number;
  damage: number;
  knockbackPower: number;
  knockbackResistance: number;
}

export interface CollideableObject extends MovingObject {
  damage: number;
  knockbackPower: number;
  knockbackResistance?: number;
}
