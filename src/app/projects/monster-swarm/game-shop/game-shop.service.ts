import { Injectable } from '@angular/core';

import { GameShopItem } from './game-shop-item';
import { ShopState, ShopUpgrade } from './game-shop.interfaces';
import { GameUpgradeCategory } from './game-upgrade-category';
import { createPlayerUpgrades, createWeaponShopItems } from './shop-items';

@Injectable({
  providedIn: 'root'
})
export class GameShopService {
  playerUpgrades: GameShopItem;
  weaponItems: GameShopItem[];
  private money = 100;

  constructor() {
    this.playerUpgrades = createPlayerUpgrades();
    this.weaponItems = createWeaponShopItems();
  }

  buyUpgrade(category: GameUpgradeCategory, upgrade: ShopUpgrade) {
    if (upgrade.isPurchased || upgrade.cost > this.money) {
      return;
    }
    this.money -= upgrade.cost;
    if (category) {
      category.purchaseUpgrade(upgrade);
    } else {
      // Items (= weapons) don't have upgrade category
      upgrade.isPurchased = true;
    }
  }

  getMoney() {
    return this.money;
  }

  toJSON() {
    return {
      money: this.money,
      playerUpgrades: this.playerUpgrades.toJSON(),
      weaponItems: this.weaponItems.map(item => item.toJSON())
    };
  }

  fromJSON(state: ShopState) {
    this.money = state.money;
    this.playerUpgrades.fromJSON(state.playerUpgrades);
    this.weaponItems.forEach(item => {
      const itemState = state.weaponItems.find(stateItem => stateItem.title === item.title);
      if (itemState) {
        item.fromJSON(itemState);
      }
    });
  }
}
