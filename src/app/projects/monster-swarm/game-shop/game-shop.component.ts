import { Component } from '@angular/core';

import { GameShopItem } from './game-shop-item';
import { ShopUpgrade } from './game-shop.interfaces';
import { GameShopService } from './game-shop.service';
import { GameUpgradeCategory } from './game-upgrade-category';

@Component({
  selector: 'v-game-shop',
  templateUrl: './game-shop.component.html',
  styleUrls: ['./game-shop.component.scss']
})
export class GameShopComponent {
  constructor(private readonly gameShop: GameShopService) {}

  get money() {
    return this.gameShop.getMoney();
  }

  get playerUpgrades(): GameUpgradeCategory[] {
    return this.gameShop.playerUpgrades.upgradeCategories;
  }

  get weaponItems(): GameShopItem[] {
    return this.gameShop.weaponItems;
  }

  hasEnoughMoney(upgrade: ShopUpgrade) {
    console.log(upgrade);
    return !upgrade || upgrade.cost < this.money;
  }

  purchase(category: GameUpgradeCategory, upgrade: ShopUpgrade) {
    this.gameShop.buyUpgrade(category, upgrade);
  }
}
