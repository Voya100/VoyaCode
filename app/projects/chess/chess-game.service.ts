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
import { HumanPlayer } from './classes/human-player';
import { ComputerPlayer } from './classes/computer-player';


@Injectable()
export class ChessGameService {

  constructor(private settings: ChessSettingsService) { }
	
	// Properties, are set in reset
	board: Tile[][] = [];
	white: Player;
	black: Player;
	gameActive: boolean = false;
	turn: boolean;
	round: number;
	gameId = 0;
	activePlayer: Player;
	winner: Player;
	
	reset(){
		this.gameActive = false;
		
		this.gameId++;
		
		this.board = [];
		
		this.white = this.settings.whiteComputer ? new ComputerPlayer("white", this) : new HumanPlayer("white", this);
		this.black = this.settings.blackComputer ? new ComputerPlayer("black", this) : new HumanPlayer("black", this);
		
		this.white.enemy = this.black;
		this.black.enemy = this.white;
		
		this.activePlayer = this.white;
		this.winner = null;

		this.round = 1;
		this.setUp();
		this.gameActive = true;
		this.turn = true;
		// Small delay so that ui has time to add pieces before computer starts its moves
		setTimeout(() => this.run(), 500);
	}
	
	// Sets the board and adds all the pieces
	setUp(){
		this.fillBoard();
		this.addPieces();
		this.doTileChecks();
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
	
	addPieces(){
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

	doTileChecks(){
		this.clearTiles();
		// Looks all possible moves
		this.white.checkAllTiles();
		this.black.checkAllTiles();
		// Looks all possible castling moves
		this.white.checkCastlingMoves();
		this.black.checkCastlingMoves();
		// Checks which pieces are protecting their kings (used by AI)
		this.white.findKingProtectors();
		this.black.findKingProtectors();
	}
	
	// Removes move information from all tiles (done before adding new move information)
	clearTiles(){
		for(var i = 0; i < 8; i++){
			for(var j = 0; j < 8; j++){
				this.board[i][j].clear();
			}
		}
	}
	
	// Plays a round, if possible (player must be computer)
	run(){
		if(this.gameActive && this.turn){
			this.activePlayer.chooseAction();
			let choice = this.activePlayer.getAction();
			this.makeTurn(choice[0], choice[1]);
		}
	}

	
	// Makes a turn, if action has been decided 
	// (is used only by computer to simulate player's clicks)
	makeTurn(piece: any, tile: any){
		if(piece == null || tile == null){
			return;
		}
		piece.tile.select(this.activePlayer);
		tile.select(this.activePlayer);
	}
	
  gameOver(loser: Player){
		this.winner = loser.enemy;
		this.gameActive = false;
	}
	
	// Changes turn and does situation checks once a turn has ended
	changeTurn(gameId: number){
		if(gameId == this.gameId){ // Make sure the game hasn't been reset
			this.doTileChecks();
			this.activePlayer = this.activePlayer.enemy;
			this.turn = true;
			if(this.activePlayer.color == "white"){
				this.round += 1;
			}
			this.run();
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
	
}