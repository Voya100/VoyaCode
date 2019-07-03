# Monster Swarm

TODO: Update/rewrite this.

## Gameplay

In monster swarm you defeat enemies to gain points and money. Money can be used to buy new weapons and upgrades. Player will lose health from collisions with enemies or enemy bullets. The game will end if player loses all health or has comnpleted all rounds.

Enemies come in waves. Player can skip wave rounds, which will cause the next wave to come immediately. If player skips a round, they will get bonus points and money for all the currently remaining enemies. The bonus points will be rewarded after player completes a round without skipping. This mechanic ensures that player won't get the points if they can't handle all the enemies.

The game has three hiscore categories: best score, most amount of money and number of kills. Custom hiscore categories are a feature that's implemented by the group, and thus won't work with other game websites. The game will detect if custom hiscores aren't supported and only use 'best score' as the default hiscore category, which should be supported by all websites.

How to play:
- Arrow keys/WASD to move
- Aim: mouse
- 1/2/3: Change weapon

## Code

Code uses pure vanille JavaScript, meaning that it doesn't use any libraries. The code utilises es6 features such as destructuring, classes, default properties and promises heavily.

The UI consists mostly of the HTML5 canvas element. jQuery is not used because it doesn't help much with canvas, and other DOM interactions can be easily done with just JavaScript.

The code has been split into multiple files and classes so that the code is easier to manage.

### GameTimer class

The game is run with 'ticks' which advance the game by a fixed duration. Each tick moves game objects, checks collision detection and checks game ending conditions.

GameTimer checks on each animation frame whether a tick or multiple ticks should be run. Ticks are run in a way that the game will advance the same amount in real time even if there was some lag. Ticks are not combined so that the game runs predictably (i.e. situations where collision detection is skipped by 'jumping' over enemies). The main logic of the timer is partly based on this JavaScript game timer tutorial: https://www.youtube.com/watch?v=JZbSTMNVkjc

The game uses seconds as the time unit.

### Game class

Game class contains all main logic of the game including game progression and UI updates. The game area itself is implemented with canvas, that is updated with paint method. Each object that is painted has its own paint implementation, details of which are in subclasses of MovingObject.

UI elements that are accessed frequently are saved in ui property so that they don't need to be fetched multiple times.

### PostMessageService

PostMessageService handless all post message communication.

### MovingObject

MovingObject is an object that can move on the canvas and potentially collide with other objects. All MovingObjects have round shape by default. It has been made to be easily extendable and modifyiable by subclasses.

### Creature

Creature is a MovingObject which has health and can take damage. Creatures can own weapons.

### Player

Player is Creature that represents the player. Player's movement is strictly restricted to game area and player can accelerate only to one of eight potential directions (up, right-up, right, etc.) depending on which keys are pressed.

### Enemy

The game has multiple subclasses for Enemy. Subclasses may have different amounts of health, speed and different weapons. Most enemies take the player as a target and move towards them constantly.

### Weapon

Weapons shoot 1 or more projectiles at certain intervals. Each projectile may have their own start angle and direction. Weapons also have a paint method which is used before weapon's owner is painted. Each weapon type has their own subclass.

### Projectile

Projectiles are MovingObjects that are shot from weapons. They move at constant speed to wanted direction and disappear on contact with other objects.

### UpgradeShop

UpgradeShop contains state and UI logic related to shop and upgrades. Because player and weapons are directly rely on shop's state, UpgradeShop also acts as Player and Weapon factory.

Shop uses slightly similar mechanics as React library to generate UI's HTML, but instead of React's JSX, template literals are used. Render methods are split into smaller functions ('components') that make the code easier to manage. When changes are made, whole shop UI is rendered again. This is because most of the inner components depend on money attribute, which often changes with any shop state changes. This shouldn't cause any performance issues because updates are done relatively rarely.
