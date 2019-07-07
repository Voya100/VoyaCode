import { ShopUpgrade } from './game-shop.interfaces';

/**
 * Upgrade category represents a property which can be updated.
 * Upgrades are linear, with only latest upgrade being active.
 */
export class GameUpgradeCategory {
  private currentUpgradeIndex = 0;

  constructor(public property: string, public title: string, public upgrades: ShopUpgrade[]) {}

  get currentUpgrade() {
    return this.upgrades[this.currentUpgradeIndex];
  }

  get nextUpgrade() {
    return this.upgrades[this.currentUpgradeIndex + 1];
  }

  purchaseUpgrade(upgrade: ShopUpgrade) {
    this.currentUpgradeIndex = this.upgrades.indexOf(upgrade);
    upgrade.isPurchased = true;
  }

  toJSON() {
    return { currentUpgradeIndex: this.currentUpgradeIndex };
  }

  fromJSON({ currentUpgradeIndex }) {
    this.currentUpgradeIndex = currentUpgradeIndex;
  }
}
