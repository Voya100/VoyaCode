import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ShopUpgrade } from '../game-shop.interfaces';
import { GameUpgradeCategory } from '../game-upgrade-category';

@Component({
  selector: 'v-game-upgrade',
  templateUrl: './game-upgrade.component.html',
  styleUrls: ['./game-upgrade.component.scss']
})
export class GameUpgradeComponent {
  @Input() upgradeCategory: GameUpgradeCategory;
  @Input() hasEnoughMoney: boolean;
  @Output() readonly purchase = new EventEmitter<ShopUpgrade>();

  get currentUpgrade() {
    return this.upgradeCategory.currentUpgrade;
  }

  get nextUpgrade() {
    return this.upgradeCategory.nextUpgrade;
  }

  isDisabled(): boolean {
    return !this.hasEnoughMoney || this.isFinalUpgrade();
  }

  isFinalUpgrade(): boolean {
    return !this.upgradeCategory.nextUpgrade;
  }

  buy() {
    this.purchase.emit(this.upgradeCategory.nextUpgrade);
  }
}
