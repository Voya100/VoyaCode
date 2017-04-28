import * as _ from 'underscore';

import { Tile } from './tile';
import { Player } from './player';

export abstract class Piece{
	color: string;
  white: boolean;
	tile: Tile;
	player: Player;

	x: number;
	y: number;
	
	// Tiles piece can move to on the next turn
	moveTiles: Tile[] = [];
	// Tiles piece could go to, if enemy is there
	hitTiles: Tile[] = [];
	protectsKing: boolean;

	dead: boolean = false;

	
	abstract value: number; 
	abstract type: string;

	tiles: Tile[];

	abstract tileCheck(): void;

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

		// Returns friendlies which can move to the tile after death	
		friends = function(){return this.tile[this.color + "Hits"]}; 	
		// Returns enemies that can hit the next turn
		threats = function(){return this.tile[this.player.enemy.color + "Hits"]};
		
		
	move(x: number,y: number){
		this.x = x;
		this.y = y;
		this.tile.piece = null;
		this.player.prevTile = this.tile;
		if(this.player.prevPiece != this){
			this.player.moveCount = 0;
		}
		this.player.prevPiece = this;
		this.player.moveCount++;
		this.tile = this.player.game.board[y][x];
		if(!this.tile.empty()){
			this.tile.piece.die(200,300);
		}
		this.tile.piece = this;
		var gameId = this.player.game.gameId;
		setTimeout(() =>{
			this.player.game.changeTurn(gameId);
		},650);
	}
	canMove(tile: Tile){return this.moveTiles.indexOf(tile) != -1;}

	//Checks 1 direction. Stops if an obstacle comes in the way.
	checkDirection(x_add: number,y_add: number,count: number,roundStart: boolean){
		var moveTiles = this.tile.checkDirection(x_add,y_add,count);

		for(var i = 0; i < moveTiles.length; i++){
			var target = moveTiles[i];
			this.hitTiles.push(target);
			target.addHitter(this);
			if(target.isFriend(this)){
				moveTiles = _.without(moveTiles,target);
			}
		}
		return moveTiles;
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
	// Removes information of piece's current possible move locations from player/tiles. Done before checking them again.
	clearTiles(){
		this.player.moveTiles = _.without(this.player.moveTiles, this.tile);
		this.moveTiles = [];
		this.hitTiles = [];
	}
	//Adds piece's possible move locations to player and tiles
	addTiles(){
		let tiles = this.moveTiles;
		for(var i = 0; i < tiles.length; i++){
			this.player.moveTiles.push(tiles[i]);
			tiles[i].addMover(this);
		}
		this.player.hitTiles = this.player.hitTiles.concat(this.hitTiles);
	}
	die(delay?: number,time?: number){
		this.clearTiles();
		this.player.pieces = _.without(this.player.pieces, this);
		this.player[this.type + "s"] = _.without(this.player[this.type + "s"], this);
		if(this.type != "pawn" || this.tile.x != 0 || this.tile.y != 7){
			// TODO: Remove this
			//this.player.game.interfaces.changeText(this.color + "_count",this.player.pieceCount());
		}
		this.dead = true;
		// Check if the game has ended
		if(this.type == "king"){
			if(this.player.kingCount() == 0){
				this.player.game.gameOver(this.player);
			}
		}else if(this.player.pieceCount() == 0){
			this.player.game.gameOver(this.player);
		}
	}
}