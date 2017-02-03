//Chess game, coded by Voya, February - June 2016
/*
This is a traditional chess game, with some small rule changes and the ability to choose custom piece layouts.
The game has 2 players. Player can be either a human player or computer AI. All combinations of the two are possible.

Program's base mechanics:

At the start of each turn the program will go through all the pieces and mark all tiles they can go to, or could if there was an enemy piece.
Those tiles are put into two categories: move tiles and hit tiles. Move tiles are tiles the piece can move. Hit tiles are tiles the piece could
potentially capture, if there was an enemy piece. For most pieces they are mostly same, but there are some crucial differences.

Hit tiles also include tiles which have friendly pieces. This is used when calculating risk of each move.
Pawns have completely separate move and hit tiles, due to their unique movement.

With this information program knows all possible moves, and AI can use it to help its decision making

The computer AI does its actions by prioritising its moves.

AI priorisation:
1. Kill the enemy king, if possible
2. Protect the king, if king is in danger
2.1. Move the king out of the way, if 2 or more enemy pieces are targetting
2.2. Kill the threat, if it's safe
2.3. Move king to safety
2.4. Block the enemy (move another piece in harm's way) or kill the enemy (even if risky). Choice depends on lowest risk.
3. Approach enemy king (move to safe tile, from which enemy king could be hit the next turn)
4. Do the least risky move, which has negative risk (kill enemy, move to safer tile, etc.)
5. Approach enemy king from further away (move to a safe tile from which a piece can go to tile fit for priorisation 3)
6. Do a move with lowest risk, that doesn't put the king in danger.
7. Do a random move.

Risk value:
One of the very core elements of AI decision making is evaluating risk. There is a method that can give a number value for each piece and move tile
combination. Risk value also includes "risk vs reward", so positive results (like capturing enemy pice) reduces risk.
Negative risk means that the move has a positive outcome, like capturing valuable enemy piece or moving a piece from risky location. 
0 risk is neutral. Positive risk means that the player will likely lose or risk something when they do the move.

Some vocabulary:
- Threat: enemy piece, which has the tile as a hit tile
- Friendly: friend piece, which has the tile as a hit tile

Risk value of a move depends on following factors (among some others):
- Threats of the tile increase risk. The more valuable movable piece is, the greater the risk.
- If tile has threats, but it also has friendlies, and threats aren't less valuable than the piece, risk is reduced.
- If piece's current tile is already risky, the risk of moving is reduced. Reduction amount depends on piece's value and whether the current tile
is defended by friendly pieces or not.
- Risk is reduced if moving captures an enemy piece, reduction depends on enemy piece's value
- Risk is increased if moving the piece puts a vastly more valuable piece in danger. With pawns it is any other type of piece, with others queen.
- If the moves are repetitive, risk is slightly increased. This is to prevent looping movements.

In all priority steps, if there is more than one possible move, the AI will chech which of them has smallest risk. If many have same risk, 
the move is randomized from them.

The AI is aware of which pieces are defending the king from enemy pieces (is in their way). Those pieces will never move so that they would leave
the king exposed, unless there is no other option.


Classes:

Game
- Handles game turn changes, setting the game, resetting, etc.
- Knows the players
- Knows the coordinates
- Contains all setting information

Player
- Keeps track of player specific information (their color, human/computer, chess pieces)
- Makes the best choice using the information from chess pieces (if computer)

Tile
- Keeps track of who is on the tile and who are close enough to get to it
- Knows its coordinates (0-0 => 7-7)
- Calculates risk value

Piece
- Knows its location, type and color
- At the start of each turn checks its surroundings
- Has a lists of all tiles it can reach
- Has the movement commands

King, queen, rook, bishop, knight, pawn
- Subclasses of Piece
- Know their type name, value and how they move
*/

function main(){
	var interfaces = new Interface();
	var game = new Game(interfaces);
	game.reset();
	
	// Set click handlers
	
	$('.play_again').click(function(){
		game.reset();
	})
	
	$('.game_mode_button').click(function(){
		interfaces.open("game_mode_screen");
		game.computerCheck();
	});
	$('.settings_button').click(function(){
		interfaces.open("settings_screen");
		game.computerCheck();
	});
	$('.instructions_button').click(function(){
		interfaces.open("instructions_screen");
		game.computerCheck();
	});
	
	$('#player_vs_computer').click(function(){
		game.changeMode(0);
	});
	$('#local_multiplayer').click(function(){
		game.changeMode(1);
	});
	$('#computer_vs_computer').click(function(){
		game.changeMode(2);
	});
	$('#save_settings').click(function(){
		game.settingUpdate();
	});
	$('#reset_layout').click(function(){
		game.resetLayout();
	})
}

$(document).ready(main);