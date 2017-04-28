import { Injectable } from '@angular/core';

import { Player } from './classes/player';
import { Tile } from './classes/tile';
import { Piece } from './classes/piece';
import { Bishop } from './classes/bishop';
import { King } from './classes/king';
import { Knight } from './classes/knight';
import { Pawn } from './classes/pawn';
import { Queen } from './classes/queen';
import { Rook } from './classes/rook';
import { ChessSettingsService } from './chess-settings.service';


@Injectable()
export class ChessGameService {

  constructor(private settings: ChessSettingsService) { }
	
	// Properties, are set in reset
	board: any[] = [];
	white: Player;
	black: Player;
	gameActive: boolean = false;
	turn: boolean;
	round: number;
	gameId = 0;
	activePlayer: Player;

	
	reset(){
		this.gameActive = false;
		
		this.gameId++;
		
		this.board = [];
		
		this.white = new Player("white",this, this.settings.whiteComputer);
		this.black = new Player("black",this, this.settings.blackComputer);
		
		this.white.enemy = this.black;
		this.black.enemy = this.white;
		
		this.activePlayer = this.white;
		this.round = 1;
		this.setUp();
		this.gameActive = true;
		this.turn = true;
		this.computerCheck();
	}
	
	// Sets the board and adds all the pieces
	setUp(){
		this.fillBoard();
		var row1 = this.settings.positions[0] + "_".repeat(8-this.settings.positions[0].length);
		var row2 = this.settings.positions[1] + "_".repeat(8-this.settings.positions[1].length);
		var row1b = row1.split("").reverse().join(""); // Black rows are mirrored
		var row2b = row2.split("").reverse().join("");
		for(var i = 0; i < 8; i++){
			this.addPiece(i,7,this.white,row1[i]);
			this.addPiece(i,0,this.black,row1b[i]);
			this.addPiece(i,6,this.white,row2[i]);
			this.addPiece(i,1,this.black,row2b[i]);
		}

		this.clearTiles();
		this.white.checkAllTiles();
		this.black.checkAllTiles();
		this.white.findKingProtectors();
		this.black.findKingProtectors();
		this.turn = true;
	}

	// Makes empty tiles for the board
	fillBoard(){
		this.board = [];
		for(var j = 0; j < 8; j++){
			this.board[j] = [];
			for(var i = 0; i < 8; i++){
				this.board[j][i] = new Tile(i,j,this);
			}
		}
	}
	
	
	// Adds piece to the board
	addPiece(x: number, y: number, player: Player, type: string){
		var piece: Piece;
		var tile = this.board[y][x];
		player.pieceId++;
		switch(type){
		case "P":
			piece = new Pawn(player,tile);
			break;
		case "R":
			piece = new Rook(player,tile);
			break;
		case "B":
			piece = new Bishop(player,tile);
			break;
		case "K":
			piece = new Knight(player,tile);
			break;
		case "Q":
			piece = new Queen(player,tile);
			break;
		case "X":
			piece = new King(player,tile);
			break;		
		default:
			piece = null;
			return;
		}
		player.addPiece(piece);
		this.board[y][x].piece = piece;
		var id = player.color + player.pieceId;
	}
	
	makeTurn(tile: Tile){
		if(this.turn){
			tile.select(this.activePlayer);
		}
	}
	
	// Checks if computer should make a move, and makes the move
	computerCheck(){
		if(this.activePlayer.computer && this.gameActive && this.turn){ //&& !this.interfaces.screenOpen()){
			var choice = this.activePlayer.chooseTarget();
			var piece = choice[0];
			var tile = choice[1];
			console.log(piece,tile);
			this.makeTurn(piece.tile);
			this.makeTurn(tile);
		}
	}
	
  gameOver(loser: Player){
		var winner = loser.enemy;
		this.gameActive = false;
    // TODO: show win message
    /*
		interfaces.changeText("win_message",winner.color.capitalize() + " wins!");
		interfaces.open("win_screen");
    */
	}
	
	// Changes turn and does situation checks one a turn has ended
	changeTurn(gameId: number){
		if(gameId == this.gameId){ // Make sure the game hasn't been reset
			this.clearTiles();
			this.white.checkAllTiles();
			this.black.checkAllTiles();
			this.white.findKingProtectors();
			this.black.findKingProtectors();
			this.activePlayer = this.activePlayer.enemy;
			this.turn = true;
			if(this.activePlayer.color == "white"){
				this.round += 1;
			}
			this.computerCheck(); // Computer's possible move
		}
	}
	
	// Returns the tile that has a piece with lowest value (used to avoid excess risk)
  // TODO: Move somewhere else, maybe?
	lowestTile(tiles: any[], isTile: boolean){
		var lowest = 100;
		var tile = tiles[0];
		for(var i=0;i<tiles.length;i++){
			if(isTile){
				if(!tiles[i].empty() && tiles[i].piece.value < lowest){
					lowest = tiles[i].piece.value;
					tile = tiles[i];
				}
			}else{ // "tiles" is array of pieces
				if(tiles[i].value < lowest){
					lowest = tiles[i].value;
					tile = tiles[i].tile;
				}
			}
		}
		return tile;
	}
	
	// Removes move information from all tiles (done before adding new ones)
	clearTiles(){
		for(var i = 0; i < 8; i++){
			for(var j = 0; j < 8; j++){
				this.board[i][j].clear();
			}
		}
	}
}