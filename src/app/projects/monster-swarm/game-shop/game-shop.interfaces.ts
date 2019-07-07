export interface ShopUpgrade {
  value?: number;
  cost: number;
  isPurchased?: boolean;
}

// ShopState is used to store/restore state from JSON
export interface ShopState {
  money: number;
  playerUpgrades: ShopItemState;
  weaponItems: ShopItemState[];
}

export interface ShopItemState {
  title: string;
  isPurchased: boolean;
  properties: {
    [key: string]: ShopCategoryState;
  };
}

export interface ShopCategoryState {
  currentUpgradeIndex: number;
}
