import * as _ from 'underscore';

import { Tile } from './tile';
import { Player } from './player';

export abstract class Piece{
	color: string;
  white: boolean;
	tile: Tile;
	player: Player;
	
	// Tiles piece can move to on the next turn
	moveTiles: Tile[] = [];
	// Tiles piece could go to, if enemy is there
	hitTiles: Tile[] = [];
	protectsKing: boolean;

	dead: boolean = false;

	
	abstract value: number; 
	abstract type: string;

	tiles: Tile[][];

  constructor(player: Player, tile: Tile){
    this.color = player.color;
    this.white = this.color == "white";
    this.tile = tile;
		this.player = player;
		this.tiles = player.game.board;
		this.moveTiles = []; 
		this.hitTiles = []; 
		this.protectsKing = false;
	}

		
	// Adds move and hit tiles (determines which tiles the piece can move to)
	abstract tileCheck(): void;

	// Returns friendlies which can move to the tile after death	
	friends(){return this.tile[this.color + "Hits"]}; 	
	// Returns enemies that can hit the next turn
	threats(){return this.tile[this.player.enemy.color + "Hits"]};

	x(): number{return this.tile.x};
	y(): number{return this.tile.y};
		
	move(x: number,y: number, changeTurn: boolean = true){
		this.tile.piece = null;
		this.player.prevTile = this.tile;
		if(this.player.prevPiece != this){
			this.player.moveCount = 0;
		}
		this.player.prevPiece = this;
		this.player.moveCount++;
		this.tile = this.player.game.board[y][x];
		if(!this.tile.empty()){
			this.tile.piece.die();
		}
		this.tile.piece = this;
		let gameId = this.player.game.gameId;
		if(changeTurn){
			setTimeout(() => this.player.game.changeTurn(gameId), 650);
		}
	}

	canMove(tile: Tile){return this.moveTiles.indexOf(tile) != -1;}

	// Marks all mobable tiles as highlighted
	highlightMovableTiles(){
		for(let i = 0; i < this.moveTiles.length; i++){
				this.moveTiles[i].highlight(false);
			}
	}
	
	//Checks all 4 directions
	checkDirections(x_add: number, y_add:number, count: number, roundStart: boolean){
		let moveTiles: Tile[] = [];
		moveTiles = moveTiles.concat(this.checkDirection(x_add,y_add,count,roundStart));
		if(x_add != 0){
			moveTiles = moveTiles.concat(this.checkDirection(-x_add,y_add,count,roundStart));
		}
		if(y_add != 0){
			moveTiles = moveTiles.concat(this.checkDirection(x_add,-y_add,count,roundStart));
		}
		if(x_add != 0 && y_add != 0){
			moveTiles = moveTiles.concat(this.checkDirection(-x_add,-y_add,count,roundStart));
		}
		return moveTiles;
	}

	// Adds tiles in 1 direction to hit/move tiles until an obstacle comes along
	checkDirection(x_add: number,y_add: number,count: number,roundStart: boolean): Tile[]{
		let moveTiles = this.tile.checkDirection(x_add,y_add,count);

		for(let i = 0; i < moveTiles.length; i++){
			let target = moveTiles[i];
			this.hitTiles.push(target);
			target.addHitter(this);
			if(target.isFriendOf(this)){
				moveTiles = _.without(moveTiles,target);
			}
		}
		return moveTiles;
	}

	// Removes information of piece's current possible move locations from player/tiles. Done before checking them again.
	clearTiles(){
		this.player.moveTiles = _.without(this.player.moveTiles, this.tile);
		this.moveTiles = [];
		this.hitTiles = [];
	}

	// Adds piece's possible move locations to player and tiles
	addTiles(){
		let tiles = this.moveTiles;
		for(let i = 0; i < tiles.length; i++){
			this.player.moveTiles.push(tiles[i]);
			tiles[i].addMover(this);
		}
		this.player.hitTiles = this.player.hitTiles.concat(this.hitTiles);
	}

	die(){
		this.clearTiles();
		this.player.pieces = _.without(this.player.pieces, this);
		this.player[this.type + "s"] = _.without(this.player[this.type + "s"], this);
		this.dead = true;
		// Check if the game has ended
		if(this.type == "king" && this.player.kingCount() == 0){
			this.player.game.gameOver(this.player);
		}else if(this.player.pieceCount() == 0){
			this.player.game.gameOver(this.player);
		}
	}
}