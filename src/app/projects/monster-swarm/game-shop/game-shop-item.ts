import { ShopCategoryState, ShopItemState, ShopUpgrade } from './game-shop.interfaces';
import { GameUpgradeCategory } from './game-upgrade-category';

/**
 * Represents something which can be purchased or upgraded throgh the shop such as weapons and player upgrades.
 * Each item may have multiple properties which can be upgraded.
 */
export class GameShopItem {
  constructor(
    public title: string,
    public purchaseInfo: ShopUpgrade,
    public upgradeCategories: GameUpgradeCategory[]
  ) {}

  get isPurchased() {
    return !this.purchaseInfo || this.purchaseInfo.isPurchased;
  }

  toJSON(): ShopItemState {
    return {
      title: this.title,
      isPurchased: this.isPurchased,
      properties: this.getPropertiesJSON()
    };
  }

  fromJSON(state: ShopItemState) {
    if (state.isPurchased && this.purchaseInfo) {
      this.purchaseInfo.isPurchased = true;
    }
    const propertyStates = state.properties;
    for (const category of this.upgradeCategories) {
      const propertyState = propertyStates[category.property];
      if (propertyState) {
        category.fromJSON(propertyState);
      }
    }
  }

  private getPropertiesJSON(): { [key: string]: ShopCategoryState } {
    return this.upgradeCategories.reduce((propertyKeys, category) => {
      propertyKeys[category.property] = category.toJSON();
      return propertyKeys;
    }, {});
  }
}
