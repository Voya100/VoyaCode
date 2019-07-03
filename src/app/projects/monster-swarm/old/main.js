/* global
Game, PostMessageService,
BasicEnemy, MediumEnemy, FastEnemy,
BasicShootingEnemy, MediumShootingEnemy, FastShootingEnemy, TowerEnemy
Boss1
*/

window.onload = function(){
  const postMessageService = new PostMessageService();
  const game = new Game(postMessageService);

  postMessageService.sendSettings({
    width: 502,
    height: 502
  });

  // For each round: which enemy types, and how many of each
  const rounds = [
    [
      [BasicEnemy, 1]
    ], [
      [BasicEnemy, 3]
    ], [
      [BasicShootingEnemy, 1]
    ], [
      [BasicShootingEnemy, 3]
    ], [
      [MediumEnemy, 1]
    ], [
      [MediumEnemy, 1],
      [BasicShootingEnemy, 2]
    ], [
      [FastEnemy, 1]
    ], [
      [FastEnemy, 3],
    ], [
      [FastEnemy, 5]
    ], [ // Round 10
      [Boss1, 1]
    ], [
      [MediumShootingEnemy, 1]
    ], [
      [MediumShootingEnemy, 2],
      [BasicShootingEnemy, 3]
    ], [
      [FastShootingEnemy, 1]
    ], [
      [FastShootingEnemy, 3]
    ], [ // Round 15
      [BasicShootingEnemy, 2],
      [MediumShootingEnemy, 2],
      [FastShootingEnemy, 2]
    ], [
      [BasicShootingEnemy, 12]
    ], [
      [MediumShootingEnemy, 5]
    ], [
      [FastShootingEnemy, 5]
    ], [
      [TowerEnemy, 1]
    ], [
      [TowerEnemy, 2]
    ], [ // Round 20
      [Boss1, 2],
      [TowerEnemy, 1]
    ], [
      [TowerEnemy, 4]
    ], [
      [TowerEnemy, 2],
      [MediumShootingEnemy, 4],
      [FastShootingEnemy, 4]
    ], [
      [FastShootingEnemy, 12]
    ], [
      [MediumShootingEnemy, 12]
    ], [
      [TowerEnemy, 8]
    ], [
      [Boss1, 1],
      [FastShootingEnemy, 10],
      [TowerEnemy, 2]
    ], [
      [BasicShootingEnemy, 24]
    ], [
      [MediumShootingEnemy, 24]
    ], [
      [FastShootingEnemy, 24]
    ], [ // Round 30
      [Boss1, 1],
      [BasicEnemy, 10],
      [BasicShootingEnemy, 10],
      [MediumEnemy, 10],
      [MediumShootingEnemy, 10],
      [FastEnemy, 10],
      [FastShootingEnemy, 10],
      [TowerEnemy, 10],
      [Boss1, 3]
    ]
  ];

  game.setRounds(rounds);
};
