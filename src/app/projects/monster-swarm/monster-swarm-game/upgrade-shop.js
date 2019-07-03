/* eslint no-unused-vars: "off" */
/* global Player, BasicWeapon, MachineGun, Shotgun */

/**
 * Contains and handles all operations related to player/weapon upgrades.
 * Also works as a factory for player and weapon classes, because they
 * heavily rely on shop's state.
 */
class UpgradeShop{
  constructor(){
    // State contains indexes of upgrades that have been bought
    this.state = {
      player: {
        health: 0,
        speed: 0,
      },
      weapons: {
        basic: {
          bought: true,
          damage: 0,
          speed: 0,
          rate: 0
        },
        machineGun: {
          bought: false,
          damage: 0,
          speed: 0,
          rate: 0
        },
        shotgun: {
          bought: false,
          bullets: 0,
          damage: 0,
          speed: 0,
          rate: 0
        },
      }
    };

    this._money = 0;
    // Function that gets called when shop window is closed (set when opened)
    this.resolveOpenPromise = () => false;

    this.playerUpgrades = [
      { property: 'health', title: 'Health' },
      { property: 'speed', title: 'Speed' },
    ];

    this.playerUpgradeValues = {
      health: [
        { value: 3, cost: 0 },
        { value: 4, cost: 5 },
        { value: 5, cost: 10 },
        { value: 6, cost: 20 },
        { value: 7, cost: 40 },
        { value: 8, cost: 80 },
        { value: 9, cost: 160 },
        { value: 10, cost: 320 },
      ],
      speed: [
        { value: 50, cost: 0 },
        { value: 60, cost: 10 },
        { value: 75, cost: 20 },
        { value: 100, cost: 40 },
        { value: 125, cost: 80 },
        { value: 150, cost: 160 },
        { value: 175, cost: 320 },
        { value: 200, cost: 640 },
      ]
    };

    const commonWeaponUpgrades = [
      { property: 'damage', title: 'Damage' },
      { property: 'speed', title: 'Speed' },
      { property: 'rate', title: 'Rate' }
    ];

    this.weaponUpgrades = [
      {
        name: 'basic',
        title: 'Basic',
        upgrades: [
          ...commonWeaponUpgrades
        ]
      }, {
        name: 'machineGun',
        title: 'Machine gun',
        upgrades: [
          ...commonWeaponUpgrades
        ]
      }, {
        name: 'shotgun',
        title: 'Shotgun',
        upgrades: [
          { property: 'bullets', title: 'Bullets' },
          ...commonWeaponUpgrades
        ]
      }
    ];

    this.weaponUpgradeValues = {
      basic: {
        cost: 0,
        damage: [
          { value: 1, cost: 0 },
          { value: 2, cost: 25 },
          { value: 3, cost: 50 }
        ],
        speed: [
          { value: 50, cost: 0 },
          { value: 75, cost: 10 },
          { value: 100, cost: 25 }
        ],
        rate: [
          { value: 0.5, cost: 0 },
          { value: 0.75, cost: 15 },
          { value: 1.0, cost: 30 },
          { value: 1.5, cost: 60 }
        ]
      },
      machineGun: {
        cost: 50,
        damage: [
          { value: 0.75, cost: 0 },
          { value: 1, cost: 25 },
          { value: 1.5, cost: 50 }
        ],
        speed: [
          { value: 100, cost: 0 },
          { value: 150, cost: 30 },
          { value: 300, cost: 60 }
        ],
        rate: [
          { value: 2, cost: 0 },
          { value: 4, cost: 45 },
          { value: 6, cost: 60 },
          { value: 8, cost: 90 },
          { value: 10, cost: 180 }
        ]
      },
      shotgun: {
        cost: 150,
        bullets: [
          { value: 3, cost: 0 },
          { value: 5, cost: 50 },
          { value: 7, cost: 150 },
          { value: 9, cost: 450 }
        ],
        damage: [
          { value: 1, cost: 0 },
          { value: 2, cost: 50 },
          { value: 3, cost: 100 },
          { value: 4, cost: 150 },
          { value: 5, cost: 250 }
        ],
        speed: [
          { value: 50, cost: 0 },
          { value: 75, cost: 20 },
          { value: 100, cost: 50 }
        ],
        rate: [
          { value: 0.5, cost: 0 },
          { value: 0.75, cost: 15 },
          { value: 1.0, cost: 30 },
          { value: 1.5, cost: 60 }
        ]
      }
    };

    this.ui = {
      shop: document.getElementById('game-shop'),
      money: document.getElementById('shop-money-value'),
      playerUpgradeContainer: document.getElementById('player-upgrade-container'),
      weaponUpgradeContainer: document.getElementById('weapon-upgrade-container')
    };
    this.setEventListeners();
  }

  get money(){
    return this._money;
  }

  set money(value){
    this._money = Math.max(value, 0);
    this.updateMoneyUiValue();
  }

  getPropertyValue(type, propertyName){
    const state = type === 'player' ? this.state.player : this.state.weapons[type];
    const upgrades = type === 'player' ? this.playerUpgradeValues[propertyName] : this.weaponUpgradeValues[type][propertyName];
    return upgrades[state[propertyName]].value;
  }

  setState(newState){
    if(!newState){
      return;
    }

    if(newState.player){
      Object.assign(this.state.player, newState.player);
    }
    if(newState.weapons){
      this.weaponUpgrades.forEach(({ name }) => {
        Object.assign(this.state.weapons[name], newState.weapons[name] || {});
      });
    }

    this.createShopUI();
  }

  buyPlayerUpgrade(property){
    const index = this.state.player[property];
    const upgrade = this.playerUpgradeValues[property][index + 1];
    if(!upgrade){
      return;
    }
    const upgradeCost = upgrade.cost;
    if(upgradeCost > this.money){
      // Not enough money
      return;
    }
    this.money -= upgradeCost;
    this.state.player[property]++;
    // Update shop UI
    this.createShopUI();
  }

  buyWeaponUpgrade(weapon, property){
    const weaponState = this.state.weapons[weapon];
    const upgradeValues = this.weaponUpgradeValues[weapon];
    let upgradeCost;
    if(property === 'buy'){
      upgradeCost = upgradeValues.cost;
      if(weaponState.bought){
        return;
      }
    }else{
      const index = weaponState[property];
      const upgrade = upgradeValues[property][index + 1];
      if(!upgrade){
        return;
      }
      upgradeCost = upgrade.cost;
    }
    if(upgradeCost > this.money){
      return;
    }
    this.money -= upgradeCost;
    if(property === 'buy'){
      weaponState.bought = true;
    }else{
      weaponState[property]++;
    }
    this.createShopUI();
  }

  createPlayer(){
    const health = this.getPropertyValue('player', 'health');
    const speed = this.getPropertyValue('player', 'speed');
    return new Player(health, speed);
  }

  createWeapons(){
    return this.weaponUpgrades.map(
      ({ name, upgrades }) => this.createWeapon(name, upgrades)
    );
  }

  createWeapon(weaponName, upgrades){
    if(!this.state.weapons[weaponName].bought){
      // Weapon is not owned
      return undefined;
    }
    // Get all weapon properties
    const properties = upgrades.reduce((prev, { property }) => {
      prev[property] = this.getPropertyValue(weaponName, property);
      return prev;
    }, {});
    switch(weaponName){
      case 'basic':
        return new BasicWeapon(properties);
      case 'machineGun':
        return new MachineGun(properties);
      case 'shotgun':
        return new Shotgun(properties);
      default:
        console.error('invalid weapon');
        return undefined;
    }
  }

  // Returns a promise that will be resolved after the shop is closed
  openShop(){
    return new Promise((resolve) => {
      this.createShopUI();
      this.ui.shop.style.display = 'block';
      this.resolveOpenPromise = resolve;
    });
  }

  closeShop(){
    this.ui.shop.style.display = 'none';
    this.resolveOpenPromise();
  }

  // Updates the entire shop UI
  createShopUI(){
    this.updateMoneyUiValue();
    this.renderPlayerShop();
    this.renderWeaponShop();
  }

  updateMoneyUiValue(){
    this.ui.money.innerText = this.money;
  }

  renderPlayerShop(){
    const html = this.playerUpgrades.map(
      ({ property, title }) => this.renderPlayerUpgrade(property, title)
    ).join('\n');
    this.ui.playerUpgradeContainer.innerHTML = html;
    this.setPlayerUpgradeEventListeners();
  }

  renderPlayerUpgrade(property, title){
    const currentIndex = this.state.player[property];
    const updateDetails = this.playerUpgradeValues[property][currentIndex];
    const nextUpdateDetails = this.playerUpgradeValues[property][currentIndex + 1];
    // It can be assumed that updateDetails always exists
    const currentValue = updateDetails.value;
    const updateIsMax = nextUpdateDetails === undefined;
    const nextValue = updateIsMax ? 'Max' : nextUpdateDetails.value;
    const cost = updateIsMax ? 'Max' : nextUpdateDetails.cost;
    return this.renderUpgrade('player', property, title, currentValue, nextValue, cost);
  }

  // isBought refers to whether weapon it is related to has been bought
  // Upgrades can only be bought for weapons that have been bought
  renderUpgrade(type, property, title, currentValue, nextValue, cost, isBought = true){
    const isDisabled = cost > this.money || nextValue === 'Max' || !isBought;
    const button = cost === 'Max' ? '' : `
    <button class="upgrade-button" ${isDisabled ? 'disabled' : ''}>
      Upgrade<br>Cost: ${cost}
    </button>`;
    return `
    <div class="upgrade" data-type="${type}" data-property="${property}">
      ${title}: ${currentValue}
      <span title="Next upgrade value">${button ? '' : '<br>'}(${nextValue})</span>
      ${button}
    </div>`;
  }

  renderWeaponShop(){
    const html = this.weaponUpgrades.map(
      ({ name, title, upgrades }) => this.renderWeaponUpgrades(name, title, upgrades)
    ).join('\n');
    this.ui.weaponUpgradeContainer.innerHTML = html;
    this.setWeaponUpgradeEventListeners();
  }

  renderWeaponUpgrades(weaponName, title, upgrades){
    const titleRender = `<h3>${title}</h3>`;
    const upgradeValues = this.weaponUpgradeValues[weaponName];
    const state = this.state.weapons[weaponName];
    const buyButton = state.bought ? '' : `
      <div class="upgrade buy-upgrade" data-type="${weaponName}" data-property="buy">
        <button class="upgrade-button" ${this.money < upgradeValues.cost ? 'disabled' : ''}>
          Buy<br>Cost: ${upgradeValues.cost}
        </button>
      </div>`;
    const upgradeRenders = upgrades.map(
      ({ property, title: upgradeTitle }) => this.renderWeaponUpgrade(weaponName, property, upgradeTitle)
    ).join('\n');
    return `${titleRender}\n${buyButton}\n${upgradeRenders}`;
  }

  renderWeaponUpgrade(weaponName, property, propertyTitle){
    const weaponState = this.state.weapons[weaponName];
    const weaponIsBought = weaponState.bought;
    const currentIndex = weaponState[property];
    const propertyValues = this.weaponUpgradeValues[weaponName][property];
    const updateDetails = propertyValues[currentIndex];
    const nextUpdateDetails = propertyValues[currentIndex + 1];
    // It can be assumed that updateDetails always exists
    const currentValue = updateDetails.value;
    const updateIsMax = nextUpdateDetails === undefined;
    const nextValue = updateIsMax ? 'Max' : nextUpdateDetails.value;
    const cost = updateIsMax ? 'Max' : nextUpdateDetails.cost;
    return this.renderUpgrade(weaponName, property, propertyTitle, currentValue, nextValue, cost, weaponIsBought);
  }

  setEventListeners(){
    document.getElementById('close-shop').onclick = () => this.closeShop();
    // upgrade click handlers are set seperately (upon creation)
  }

  setPlayerUpgradeEventListeners(){
    const playerUpgradeElements = this.ui.playerUpgradeContainer.getElementsByClassName('upgrade');
    Array.from(playerUpgradeElements).forEach(item => {
      const upgradeName = item.dataset.property;
      item.onclick = () => this.buyPlayerUpgrade(upgradeName);
    });
  }

  setWeaponUpgradeEventListeners(){
    const weaponUpgradeElements = this.ui.weaponUpgradeContainer.getElementsByClassName('upgrade');
    Array.from(weaponUpgradeElements).forEach(item => {
      const weaponName = item.dataset.type;
      const property = item.dataset.property;
      item.onclick = () => this.buyWeaponUpgrade(weaponName, property);
    });
  }
}
