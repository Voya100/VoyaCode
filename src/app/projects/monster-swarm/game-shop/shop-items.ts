import { GameShopItem } from './game-shop-item';
import { GameUpgradeCategory } from './game-upgrade-category';

export const createPlayerUpgrades = () =>
  new GameShopItem('Player stats', undefined, [
    new GameUpgradeCategory('health', 'Health', [
      { value: 3, cost: 0 },
      { value: 4, cost: 5 },
      { value: 5, cost: 10 },
      { value: 6, cost: 20 },
      { value: 7, cost: 40 },
      { value: 8, cost: 80 },
      { value: 9, cost: 160 },
      { value: 10, cost: 320 }
    ]),
    new GameUpgradeCategory('speed', 'Speed', [
      { value: 50, cost: 0 },
      { value: 60, cost: 10 },
      { value: 75, cost: 20 },
      { value: 100, cost: 40 },
      { value: 125, cost: 80 },
      { value: 150, cost: 160 },
      { value: 175, cost: 320 },
      { value: 200, cost: 640 }
    ])
  ]);

// Todo: Move somewhere else?
export const createWeaponShopItems = () => [
  new GameShopItem('Basic', undefined, [
    new GameUpgradeCategory('damage', 'Damage', [
      { value: 1, cost: 0 },
      { value: 2, cost: 25 },
      { value: 3, cost: 50 }
    ]),
    new GameUpgradeCategory('speed', 'Speed', [
      { value: 50, cost: 0 },
      { value: 75, cost: 10 },
      { value: 100, cost: 25 }
    ]),
    new GameUpgradeCategory('rate', 'Rate', [
      { value: 0.5, cost: 0 },
      { value: 0.75, cost: 15 },
      { value: 1, cost: 30 },
      { value: 1.5, cost: 60 }
    ])
  ]),
  new GameShopItem('Machine gun', { cost: 50 }, [
    new GameUpgradeCategory('damage', 'Damage', [
      { value: 0.75, cost: 0 },
      { value: 1, cost: 25 },
      { value: 1.5, cost: 50 }
    ]),
    new GameUpgradeCategory('speed', 'Speed', [
      { value: 100, cost: 0 },
      { value: 150, cost: 30 },
      { value: 300, cost: 60 }
    ]),
    new GameUpgradeCategory('rate', 'Rate', [
      { value: 2, cost: 0 },
      { value: 4, cost: 45 },
      { value: 6, cost: 60 },
      { value: 8, cost: 90 },
      { value: 10, cost: 180 }
    ])
  ]),
  new GameShopItem('Shotgun', { cost: 150 }, [
    new GameUpgradeCategory('damage', 'Damage', [
      { value: 3, cost: 0 },
      { value: 5, cost: 50 },
      { value: 7, cost: 150 },
      { value: 9, cost: 450 }
    ]),
    new GameUpgradeCategory('speed', 'Speed', [
      { value: 1, cost: 0 },
      { value: 2, cost: 50 },
      { value: 3, cost: 100 },
      { value: 4, cost: 150 },
      { value: 5, cost: 250 }
    ]),
    new GameUpgradeCategory('rate', 'Rate', [
      { value: 50, cost: 0 },
      { value: 75, cost: 20 },
      { value: 100, cost: 50 }
    ]),
    new GameUpgradeCategory('bullets', 'Bullets', [
      { value: 0.5, cost: 0 },
      { value: 0.75, cost: 15 },
      { value: 1, cost: 30 },
      { value: 1.5, cost: 60 }
    ])
  ])
];
