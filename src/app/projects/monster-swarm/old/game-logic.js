/* eslint no-unused-vars: "off" */
/* global MovingObject, Player, BasicEnemy, UpgradeShop */

/**
 * GameTimer class is used to schedule game state updates ('ticks') and
 * UI's paint updates.
 *
 * The interval between tick checks depends on user's monitor's refresh rate,
 * meaning that it's never updated faster than the screen can display.
 * If refresh rate is slower than the game's tick rate, multiple ticks may be
 * run during a single refresh. This ensures that game advances the same amount in
 * real time. UI gets updated only once.
 *
 * If tick rate is slower than refresh rate, it essentially caps the maximum FPS. This
 * may help prevent potential performance issues. UI is updated only if there has been changes.
 */
class GameTimer{
  constructor(){
    // tickInterval = time between ticks in seconds
    this.tickInterval = 0.5;
    this.time = 0;
    this.active = false;
    this.timeSinceLastTick = 0;
    this.callback = () => false;
    this.paint = () => false;

    // Bind this context so that a new function doesn't need to be created
    // every time it is passed as parameter
    this.animationFrame = this.animationFrame.bind(this);
  }

  start(tickRate, tickCallback, paintCallback){
    this.active = true;
    this.tickInterval = 1 / tickRate;
    this.time = performance.now();
    this.callback = tickCallback || this.callback;
    this.paint = paintCallback || this.paintCallback;
    requestAnimationFrame(this.animationFrame);
  }

  animationFrame(time){
    if(!this.active){
      return;
    }
    this.timeSinceLastTick += time - this.time;
    this.time = time;
    let ticks = 0;
    // Even though in case of multiple ticks the duration could
    // be combined (= 1 longer tick), they are run individually
    // to ensure that the game runs as it should.
    // If a tick was very long, player could potentially 'jump' over enemies
    // because collision detection is run only once
    while(this.timeSinceLastTick > this.tickInterval * 1000){
      this.callback(this.tickInterval);
      this.timeSinceLastTick -= this.tickInterval * 1000;
      ticks++;
      // Max amount of ticks in one paint
      if(ticks > 3){
        this.timeSinceLastTick = 0;
      }
    }
    if(ticks > 0){
      // Paint only if game state is updated
      this.paint();
    }
    requestAnimationFrame(this.animationFrame);
  }

  stop(){
    this.active = false;
  }
}

/**
 * Contains main game logic
 */
class Game{
  constructor(postMessageService){
    this.canvas = document.getElementById('game-canvas');
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    this.timer = new GameTimer();
    this.shop = new UpgradeShop();
    this.postMessageService = postMessageService;

    this.hiscores = {
      score: 0,
      money: 0,
      kills: 0
    };

    this.rounds = [];
    this.weapons = [];
    this.selectedWeaponIndex = 0;
    this.roundSkipBonus = 0;
    this.score = 0;
    this.round = 1;

    this.ui = {
      health: document.getElementById('js-health-value'),
      money: document.getElementById('js-money-value'),
      score: document.getElementById('js-score-value'),
      bestScore: document.getElementById('js-best-score-value'),
      round: document.getElementById('js-round-value'),
      gameError: document.getElementById('game-error'),
      errorDescription: document.getElementById('error-description'),
      gameOver: document.getElementById('game-over-screen'),
      gameOverScore: document.getElementById('game-over-score'),
      weaponButtons: document.getElementsByClassName('weapon-button')
    };

    // Keeps track of values currently in UI so that they are updated
    // only if there are any changes
    this.uiValues = {
      health: 0,
      money: 0,
      score: 0,
      bestScore: 0,
      round: 1
    };

    this.shop.createShopUI();
    this.addListeners();
    // Request game state from parent
    this.postMessageService.loadState();
  }

  get money(){
    return this.shop.money;
  }
  set money(value){
    this.shop.money = value;
  }

  addKill(){
    this.hiscores.kills++;
  }

  addListeners(){
    window.addEventListener('keydown', (e) => {
      switch(e.key){
        case 'ArrowUp':
        case 'w':
          this.playerDirection.y = -1;
          break;
        case 'ArrowRight':
        case 'd':
          this.playerDirection.x = 1;
          break;
        case 'ArrowDown':
        case 's':
          this.playerDirection.y = 1;
          break;
        case 'ArrowLeft':
        case 'a':
          this.playerDirection.x = -1;
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          this.switchWeapon(e.key - 1);
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch(e.key){
        case 'ArrowUp':
        case 'w':
          this.playerDirection.y = 0;
          break;
        case 'ArrowRight':
        case 'd':
          this.playerDirection.x = 0;
          break;
        case 'ArrowDown':
        case 's':
          this.playerDirection.y = 0;
          break;
        case 'ArrowLeft':
        case 'a':
          this.playerDirection.x = 0;
          break;
        default:
          break;
      }
    });

    document.getElementById('start-game-button').addEventListener('click', e => {
      document.getElementById('start-screen').style.display = 'none';
      this.reset();
    });

    document.getElementById('try-again-button').addEventListener('click', e => {
      this.ui.gameOver.classList.remove('active');
      this.reset();
    });

    document.getElementById('skip-round-button').addEventListener('click', e => {
      this.skipRound();
    });

    document.getElementById('shop-button').addEventListener('click', e => {
      this.shop.openShop().then(() => {
        // Save potential changes made by shop
        this.updateUi();
        this.saveState();
      });
    });

    Array.from(this.ui.weaponButtons).forEach(button => {
      button.addEventListener('click', e => {
        this.switchWeapon(button.dataset.weaponIndex);
      });
    });

    this.canvas.addEventListener('mousemove', (e) => {
      this.mousePosition = { x: e.clientX, y: e.clientY };
    });

    this.postMessageService.addListeners(
      (state) => this.loadState(state),
      (error) => this.showError(error)
    );
  }

  loadState(state){
    const { money, hiscores, shop } = state;
    if(money){
      this.money = money;
    }
    if(shop){
      this.shop.setState(shop);
      this.updateWeaponButtons();
    }

    if(hiscores){
      this.hiscores.score = hiscores.score || this.hiscores.score;
      this.hiscores.money = hiscores.money || this.hiscores.money;
      this.hiscores.kills = hiscores.kills || this.hiscores.kills;
    }
    this.updateUi();
    if(this.timer.active){
      this.reset();
      this.showError('Game save loaded');
    }
  }

  saveState(){
    const state = {
      money: this.money,
      hiscores: this.hiscores,
      shop: this.shop.state
    };
    this.postMessageService.save(state);
  }

  showError(error){
    // Show error
    this.ui.errorDescription.innerHTML = error;
    this.ui.gameError.style.opacity = 1;
    // Hide after small delay
    setTimeout(() => {
      this.ui.gameError.style.opacity = 0;
    }, 5000);
  }

  switchWeapon(index){
    const weapon = this.weapons[index];
    if(weapon){
      this.selectedWeaponIndex = +index;
      if(this.player){
        this.player.weapon = weapon;
      }
      this.updateWeaponButtons();
    }
  }

  reset(){
    this.player = this.shop.createPlayer();
    this.weapons = this.shop.createWeapons();
    this.switchWeapon(this.selectedWeaponIndex);

    // Currently active enemies
    this.enemies = [];
    // Enemies of the round that haven't been added yet
    this.enemiesToAdd = [];

    this.playerBullets = [];
    this.enemyBullets = [];

    // There is a small delay so that all enemies won't come at exactly the same time
    this.enemyDelayTime = 0.25;
    this.enemyTimer = this.enemyDelayTime;

    this.playerDirection = { x: 0, y: 0 };
    this.mousePosition = { x: 0, y: 0 };

    this.score = 0;
    this.round = 0;
    this.roundSkipBonus = 0;

    this.changeRound();
    this.timer.start(20, (time) => this.runTick(time), () => this.paint());
  }

  setRounds(rounds){
    this.rounds = rounds;
  }

  // If a round is skipped, player will get double points for remaining enemies.
  skipRound(){
    if(!this.timer.active || this.rounds.length <= this.round + 1){
      return;
    }
    [...this.enemies, ...this.enemiesToAdd].forEach(enemy => {
      this.roundSkipBonus += enemy.points;
    });
    this.changeRound();
  }

  changeRound(){
    // Award obtained bonus points if current round was not skipped
    if(this.enemies.length === 0 && this.enemiesToAdd.length === 0){
      this.score += this.roundSkipBonus;
      this.money += this.roundSkipBonus;
      this.roundSkipBonus = 0;
    }

    const roundEnemies = this.rounds[this.round];
    this.round++;
    if(roundEnemies === undefined){
      this.showVictory();
      return;
    }

    this.enemiesToAdd = roundEnemies.reverse().reduce((enemies, [EnemyClass, number]) => {
      for(let i = 0; i < number; i++){
        enemies.push(new EnemyClass());
      }
      return enemies;
    }, []);
  }

  showGameOver(){
    this.endGame();
    this.ui.gameOverScore.innerText = this.score;
    this.ui.gameOver.classList.add('active');
  }

  showVictory(){
    // Todo: victory message
    this.endGame();
    this.ui.gameOverScore.innerText = this.score;
    this.ui.gameOver.classList.add('active');
  }

  endGame(){
    this.timer.stop();
    this.updateHiscores();
    this.saveState();
  }

  updateHiscores(){
    if(this.money > this.hiscores.money){
      this.hiscores.money = this.money;
      this.postMessageService.sendScore(this.money, 'Money');
    }
    if(this.score > this.hiscores.score){
      this.hiscores.score = this.score;
      this.postMessageService.sendScore(this.score, 'Score');
    }
    this.postMessageService.sendScore(this.hiscores.kills, 'Kills');
  }

  // Runs a single game 'tick' which moves all objects, checks collisions
  // and checks game over conditions
  runTick(time){
    this.enemyTimer -= time;

    while(this.enemiesToAdd.length && this.enemyTimer < 0){
      this.enemies.push(this.enemiesToAdd.pop());
      this.enemyTimer += this.enemyDelayTime;
    }

    this.player.moveToDirection(this.playerDirection);
    this.player.setWeaponDirection(this.mousePosition);

    this.playerBullets.forEach(bullet => bullet.move(time));
    this.enemyBullets.forEach(bullet => bullet.move(time));

    this.player.move(time);

    const playerBullets = this.player.shoot(time);
    if(playerBullets.length){
      this.playerBullets.push(...playerBullets);
    }

    this.enemies.forEach(enemy => {
      enemy.move(time, this.player);
      const enemyBullets = enemy.shoot(time, this.player);
      if(enemyBullets.length){
        this.enemyBullets.push(...enemyBullets);
      }
    });
    this.checkCollisions();

    if(!this.enemies.length && !this.enemiesToAdd.length){
      // No more enemies left
      this.changeRound();
    }

    if(this.player.health <= 0){
      this.showGameOver();
    }
  }

  checkCollisions(){
    // Reverse iteration order because objects may get removed
    // Otherwise indexes would become 'invalid'
    for(let i = this.enemies.length - 1; i >= 0; i--){
      const enemy = this.enemies[i];
      if(enemy.isColliding(this.player)){
        enemy.collide(this.player);
        this.player.collide(enemy);
      }
      if(enemy.isExpired){
        this.enemies.splice(i, 1);
        this.score += enemy.points;
        this.money += enemy.money;
        this.addKill();
      }
    }

    for(let i = this.enemyBullets.length - 1; i >= 0; i--){
      const bullet = this.enemyBullets[i];
      if(bullet.isColliding(this.player)){
        bullet.collide(this.player);
        this.player.collide(bullet);
      }
      if(bullet.isExpired){
        this.enemyBullets.splice(i, 1);
      }
    }

    for(let i = this.playerBullets.length - 1; i >= 0; i--){
      const bullet = this.playerBullets[i];
      for(let j = 0; j < this.enemies.length; j++){
        const enemy = this.enemies[j];
        if(bullet.isColliding(enemy)){
          bullet.collide(enemy);
          enemy.collide(bullet);
          if(bullet.isExpired){
            break;
          }
        }
      }
      if(bullet.isExpired){
        this.playerBullets.splice(i, 1);
      }
    }
  }

  paint(){
    this.context.clearRect(0, 0, 500, 500);
    this.player.paint(this.context);
    this.enemies.forEach(enemy => enemy.paint(this.context));
    this.playerBullets.forEach(bullet => bullet.paint(this.context));
    this.enemyBullets.forEach(bullet => bullet.paint(this.context));
    this.updateUi();
  }

  updateUi(){
    if(this.player && this.player.health !== this.ui.health){
      this.ui.health.innerText = `${this.player.health}/${this.player.maxHealth}`;
      this.uiValues.health = this.player.health;
    }
    if(this.money !== this.uiValues.money){
      this.ui.money.innerText = this.money;
      this.uiValues.money = this.money;
    }
    if(this.score !== this.uiValues.score){
      this.ui.score.innerText = this.score;
      this.uiValues.score = this.score;
    }
    if(this.hiscores.score !== this.uiValues.bestScore){
      this.ui.bestScore.innerText = this.hiscores.score;
      this.uiValues.score = this.hiscores.score;
    }
    if(this.round !== this.uiValues.round){
      this.ui.round.innerText = this.round;
      this.uiValues.round = this.round;
    }
  }

  // Disable buttons that are not bought, enable those that are
  // and mark selected weapon as active
  updateWeaponButtons(){
    const activeIndex = this.selectedWeaponIndex;
    Array.from(this.ui.weaponButtons).forEach(button => {
      const index = +button.dataset.weaponIndex;
      if(index === activeIndex){
        button.classList.add('active');
      }else if(button.classList.contains('active')){
        button.classList.remove('active');
      }
      if(this.weapons[index] && button.disabled){
        button.disabled = false;
      }else if(!this.weapons[index] && !button.disabled){
        button.disabled = true;
      }
    });
  }
}
