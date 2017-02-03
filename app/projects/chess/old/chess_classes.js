// Description of the program can be found from chess.js

// Array functions

//Removes a specific value from array
function del(array,val) {
    var index = array.indexOf(val); 
    if (index >= 0) array.splice(index, 1);
}; 

function inArray(array,val){
	return array.indexOf(val) != -1;
}

// Returns values that are in both arrays
function intersection(array1,array2){
	var new_array = array1.filter(function(n) {
	    return array2.indexOf(n) != -1;
	});
	return new_array;
}

// Returns array with values that aren't in both arrays
function diff(array1,array2){
	var new_array = array1.filter(function(i) {return array2.indexOf(i) < 0;});
	return new_array;
}

// Return random value from array
function randVal(array){
	return array[Math.floor(Math.random()*array.length)];
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


//Handles all interface interactions
function Interface(){
	
	this.activeScreen = "game_mode_screen";
	
	this.screenOpen = function(){return this.activeScreen != null};
	
	// Opens interface, closes if already open. Closes all other interfaces
	this.open = function(screen,delay){
		if(this.activeScreen != screen){
			this.closeInterfaces();
			$('#' + screen).fadeIn(delay);
			this.activeScreen = screen;
		}else{
			this.closeInterfaces();
		}
	}
	
	this.close = function(screen,delay){
		$('#' + screen).fadeOut(delay);
	}
	
	this.changeText = function(screen,text){
		$('#' + screen).html(text);
	}
	
	// Updates side interface
	// activePlayer: "black" or "white"
	this.updateStats = function(activePlayer,roundCount,whites,blacks){
		this.changeText('turn',activePlayer.capitalize() + "'s turn");
		this.changeText('round_count',roundCount);
		this.changeText('white_count',whites);
		this.changeText('black_count',blacks);
	}
	
	// Closes all extra interfaces
	this.closeInterfaces = function(){
		this.close("win_screen",500);
		this.close("settings_screen",500);
		this.close("game_mode_screen",500);
		this.close("instructions_screen",500);
		this.activeScreen = null;
	}
}

function Game(interfaces){
	this.interfaces = interfaces;
	this.defaultPositions = ["RKBXQBKR",
	                         "PPPPPPPP"];
	// Settings
	this.positions = this.defaultPositions;
	this.whiteComputer = false;
	this.blackComputer = true;
	
	// Properties, are set in reset
	this.board = [];
	this.white;
	this.black;
	this.gameActive = false;
	this.turn;
	this.round;
	this.gameId = 0;
	this.activePlayer;
	
	// Makes empty tiles for the board
	this.fillBoard = function(){
		this.board = [];
		for(var i = 0; i < 8; i++){
			this.board[i] = [];
			for(var j = 0; j < 8; j++){
				this.board[i][j] = new Tile(i,j,this);
			}
		}
	}
	
	// Adds piece to the board
	this.addPiece = function(x,y,player,type){
		var piece
		var tile = this.board[x][y];
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
		this.board[x][y].piece = piece;
		var id = player.color + player.pieceId;
		x = x*80;
		y = y*80;
		//Promotion
		if(this.round > 1){
			$('#pieces').append("<div style=\"background:url('" + piece.img + "'); display:none; left: " + x + "px; top:" + y + "px;\" id='" + id + "' class='piece'></div>");
			setTimeout(function(){
				$('#'+id).fadeIn(700);
			},600)
		}else{
			$('#pieces').append("<div style=\"background:url('" + piece.img + "'); left: " + x + "px; top:" + y + "px;\" id='" + id + "' class='piece'></div>");
		}
	}
	
	// Sets the board and adds all the pieces
	this.setUp = function(){
		this.fillBoard();
		var row1 = this.positions[0] + "_".repeat(8-this.positions[0].length);
		var row2 = this.positions[1] + "_".repeat(8-this.positions[1].length);
		var row1b = row1.split("").reverse().join(""); // Black rows are mirrored
		var row2b = row2.split("").reverse().join("");
		for(var i = 0; i < 8; i++){
			this.addPiece(0,i,this.white,row1[i]);
			this.addPiece(7,i,this.black,row1b[i]);
			this.addPiece(1,i,this.white,row2[i]);
			this.addPiece(6,i,this.black,row2b[i]);
		}

		this.clearTiles();
		this.white.checkAllTiles();
		this.black.checkAllTiles();
		this.white.findKingProtectors();
		this.black.findKingProtectors();
		this.turn = true;
	}
	
	this.reset = function(){
		this.gameActive = false;
		
		this.gameId++;
		
		this.board = [];
		
		this.white = new Player("white",this);
		this.black = new Player("black",this);
		
		this.white.computer = this.whiteComputer;
		this.black.computer = this.blackComputer;
		
		this.white.enemy = this.black;
		this.black.enemy = this.white;
		
		this.activePlayer = this.white;
		this.round = 1;
		$('#pieces').html(""); // Remove old pieces
		$('.movableTile').removeClass("movableTile");
		$('.highlight').removeClass("highlight");
		if(this.gameId > 1){ // Don't close interface when game is launched
			this.interfaces.closeInterfaces();
		}
		this.setUp();
		this.updateStats();
		this.gameActive = true;
		this.turn = true;
		this.computerCheck();
	}
	
	// Update side interface
	this.updateStats = function(){
		this.interfaces.updateStats(this.activePlayer.color,this.round,this.white.pieces.length,this.black.pieces.length);
	}
	
	this.makeTurn = function(tile){
		if(this.turn){
			tile.select(this.activePlayer);
		}
	}
	
	// Checks if computer should make a move, and makes the move
	this.computerCheck = function(){
		if(this.activePlayer.computer && this.gameActive && this.turn && !this.interfaces.screenOpen()){
			var choice = this.activePlayer.chooseTarget();
			var piece = choice[0];
			var tile = choice[1];
			console.log(piece,tile);
			this.makeTurn(piece.tile);
			this.makeTurn(tile);
		}
	}
	
	this.gameOver = function(loser){
		var winner = loser.enemy;
		this.gameActive = false;
		interfaces.changeText("win_message",winner.color.capitalize() + " wins!");
		interfaces.open("win_screen");
	}
	
	// Changes turn and does situation checks one a turn has ended
	this.changeTurn = function(gameId){
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
			this.updateStats();
			this.computerCheck(); // Computer's possible move
		}
	}
	
	// Returns the tile that has a piece with lowest value (used to avoid excess risk)
	this.lowestTile = function(tiles,isTile){
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
	this.clearTiles = function(){
		for(var i = 0; i < 8; i++){
			for(var j = 0; j < 8; j++){
				this.board[i][j].clear();
			}
		}
	}
	
	// Changes piece layout back to default, and resets the game
	this.resetLayout = function(){
		$('#pieceRow1').val(this.defaultPositions[0]);
		$('#pieceRow2').val(this.defaultPositions[1]);
		this.settingUpdate();
	}
	
	// Changes piece layout to user input, and resets the game
	this.settingUpdate = function(){
		var row1 = $('#pieceRow1').val();
		var row2 = $('#pieceRow2').val();
		this.positions = [row1,row2];
		this.reset();
	}
	
	// Changes game mode and resets the game
	this.changeMode = function(mode){
		switch(mode){
		case 0: // Player vs computer
			this.whiteComputer = false;
			this.blackComputer = true;
			break;
		case 1: // Local multiplayer
			this.whiteComputer = false;
			this.blackComputer = false;
			break;
		case 2: // Computer vs computer
			this.whiteComputer = true;
			this.blackComputer = true;
			break;
		}
		this.reset();
	}
	
	$('#pieces').unbind();
}

function Tile(x,y,game){
	this.x = x;
	this.y = y;
	this.game = game;
	this.board = game.board;
	this.piece = null;
	this.empty = function(){return this.piece == null;} // True if there is a piece on the tile, false otherwise
	this.whites = []; // Whites who can move to the tile
	this.whiteHits = []; // Whites who could hit the tile, if there was an enemy
	this.blacks = []; // Blacks who can move to the tile
	this.blackHits = []; // Blacks who could hit the tile, if there was an enemy
	var tile = this;
	var $tile = $('#coord' + x + y);
	
	// Removes previous click handler, in case game has been reset
	$tile.off('click').on('click', function(){game.makeTurn(tile)})

	// True if this tile has a piece with same color as piece given by parameter
	this.isFriend = function(piece){
		return !this.empty() && this.piece.color == piece.color; 
	}
	
	// Tells if piece on this tile is preventing enemy from going to target tile
	this.protectsTile = function(targetTile,player){
		// Doesn't protect, if there are pieces between this and the tile
		if(this.tilesBetween(targetTile) === false || this.tilesBetween(targetTile).filter(function(tile){return !tile.empty()}).length > 0){
			return false;
		}
		
		if(this.x == targetTile.x){ // They are on same column, threats: rook and queen
			var y_dir = this.y < targetTile.y ? -1 : 1;
			for(var y=this.y+y_dir; 0 <= y && y < 8;y+= y_dir){
				var tile = this.game.board[this.x][y];
				if(!tile.empty() && tile.piece.color != player.color && (tile.piece.type == 'rook' || tile.piece.type == 'queen')){
					return true;
				}else if(!tile.empty()){
					break;
				}
			}
		}
		if(this.y == targetTile.y){ // They are on same row, threats: rook and queen
			var x_dir = this.x < targetTile.x ? -1 : 1;
			for(var x=this.x+x_dir; 0 <= x && x < 8;x+= x_dir){
				var tile = this.game.board[x][this.y];
				if(!tile.empty() && tile.piece.color != player.color && (tile.piece.type == 'rook' || tile.piece.type == 'queen')){
					return true;
				}else if(!tile.empty()){
					break;
				}
			}
		}
		if(Math.abs(this.y-targetTile.y) == Math.abs(this.x-targetTile.x)){ // They are diagonal, threats: bishop and queen
			var x_dir = this.x < targetTile.x ? -1 : 1;
			var y_dir = this.y < targetTile.y ? -1 : 1;
			
			for(var x = this.x+x_dir, y = this.y+y_dir;0 <= x && x < 8 && 0 <= y && y < 8; x+= x_dir, y+= y_dir){
				var tile = this.game.board[x][y];
				if(!tile.empty() && tile.piece.color != player.color && (tile.piece.type == 'bishop' || tile.piece.type == 'queen')){
					return true;
				}else if(!tile.empty()){
					break;
				}
			}
		}
		return false;
	}
	
	// Tells if tile is protecting king (is between it and enemy piece)
	this.protectsKing = function(player){
		if(player.kings.length == 0 || (!this.empty() && this.piece.type == 'king')){
			return false;
		}
		var kingTile = player.kings[0].tile;
		return this.protectsTile(kingTile,player);
	}
	
	// Evaluates the risk vs reward of moving the piece to this tile. If risk is negative, it's generally worth doing.
	this.riskValue = function(piece){
		var risk = 0;
		var threats = this[piece.player.enemy.color + "Hits"]; // Enemies who can attack tile
		var friendlies = this[piece.color + "Hits"]; // Player's pieces which can attack the tile, if captured by enemy
		var piecesThreats = piece.threats(); // Enemies who can attack piece's current location
		
		// Enemy can hit this tile now, or after moving to it
		if(threats.length > 0 || piece.tile.protectsTile(this,piece.player)){
			risk += piece.value;
			// Risk is reduced if there are frienly pieces looking over the tile. Doesn't work if piece is more valuable than threats.
			if(threats.length > 0 && friendlies.length > 1 && this.game.lowestTile(threats,false).piece.value >= piece.value){
				risk -= 2;
			}
			if(piece.type == "king"){
				risk += 100;
			}
		}
		// Risk is reduced if current location is already risky
		if(piecesThreats.length >= 1 && piece.friends().length == 0){
			risk -= piece.value / 2;
		}else if(piecesThreats.length >= 1 && this.game.lowestTile(piecesThreats,false).piece.value < piece.value){
			risk -= piece.value / 3;
		}
		
		// Prevents opening a weak spot, which can't be defended in start of the game
		if(piece.type == 'pawn' 
		  && ((piece.color == 'black' && piece.tile.x == 6 && piece.tile.y == 5) || (piece.color == 'white' && piece.tile.x == 1 && piece.tile.y == 2))
		  && piece.friends().length == 1){
			risk += 2;
		}
		
		// Risk is reduced if moving kills an enemy (risk vs reward)
		if(!this.empty() && this.piece.color != piece.color){
			risk -= this.piece.value;
		}
		// Risk is increased, if current tile protects a more valuable tile
		if(piece.value <= 5){
			var valuablePieces;
			if(piece.type == 'pawn'){
				valuablePieces = diff(piece.player.pieces,piece.player.pawns);
			}else{
				valuablePieces = piece.player.queens;
			}
			for(var i=0;i<valuablePieces.length;i++){
				var valPiece = valuablePieces[i];
				if(piece.tile.protectsTile(valPiece.tile,piece.player) && valPiece.friends().length == 0 && !this.protectsTile(valPiece.tile,piece.player)){
					risk += valPiece.value / 2;
					break;
				}
			}
		}
		
		// Small prevention to doing same moves again
		if(piece.player.prevTile == this){
			risk += 0.3;
		}
		
		// Small prevention to moving between safe tiles with same piece
		if(piece.player.prevPiece == piece){
			risk += 0.1 * piece.player.moveCount;
		}
		
		console.log("Risk",piece,this,risk);
		return risk;		
	}
	
	// Removes same highlight from other tiles and gives it to this one
	this.highlight = function(type,unique){
		if(unique == true){
			$('.' + type).removeClass(type);
		}
		$tile.addClass(type);
	}
	// Adds a piece that can move to this tile
	this.addMover = function(piece){
		if(piece.white){
			this.whites.push(piece);
		}else{
			this.blacks.push(piece);
		}
	}
	// Adds a piece that could hit this tile (if there is an enemy)
	this.addHitter = function(piece){
		if(piece.white){
			this.whiteHits.push(piece);
		}else{
			this.blackHits.push(piece);
		}
	}
	
	this.clear = function(){
		this.whites = [];
		this.whiteHits = [];
		this.blacks = [];
		this.blackHits = [];
	}
	// Returns tiles between the two tiles
	this.tilesBetween = function(tile){
		var x_add = 0, y_add = 0;
		// Checks that they are on same column/row or diagonal
		if(this.x != tile.x && this.y != tile.y && Math.abs(this.x-tile.x) != Math.abs(this.y-tile.y)){
			return false;
		}
		if(this.x != tile.x){
			x_add = this.x < tile.x ? 1 : -1;
		}
		if(this.y != tile.y){
			y_add = this.y < tile.y ? 1 : -1;
		}
		var tiles = [];
		for(var x=this.x+x_add, y=this.y+y_add; y != tile.y || x != tile.x; x += x_add, y += y_add){
			tiles.push(this.game.board[x][y]);
		}
		return tiles;	
	}
	
	// Checks if tile is between 2 tiles
	this.isBetween = function(targetTile,enemyTile){
		var x_min = Math.min(targetTile.x,enemyTile.x), x_max = Math.max(targetTile.x,enemyTile.x);
		var y_min = Math.min(targetTile.y,enemyTile.y), y_max = Math.max(targetTile.y,enemyTile.y);
		
		// Same row/column
		if((this.x == targetTile.x && targetTile.x == enemyTile.x && y_min < this.y && this.y < y_max) 
		 || this.y == targetTile.y && targetTile.y == enemyTile.y && x_min < this.x && this.x < x_max){
			return true;
		// Diagonal
		}else if(Math.abs(this.x-targetTile.x) == Math.abs(this.y-targetTile.y) 
				&& Math.abs(this.x-enemyTile.x) == Math.abs(this.y-enemyTile.y)
				&& Math.abs(enemyTile.x-targetTile.x) == Math.abs(enemyTile.y-targetTile.y)){
			return true;
		}else{
			return false;
		}		
	}
	
	// Returns tiles in specific direction, until it meets an obstacle (end of board or piece)
	this.checkDirection = function(x_add,y_add,count){
		if(count != 1){
			count = 8;
		}
		var tiles = [];
		var x = this.x;
		var y = this.y;
		for(var i = 1; i < count+1; i++){
			if(x + x_add*i < 8 && x + x_add*i >= 0 && y + y_add*i < 8 && y + y_add*i >= 0){
				var tile = this.board[x + x_add*i][y + y_add*i];
				tiles.push(tile);
				if(!tile.empty()){
					break;
				}
			}
		}
		return tiles;
	}
	//Checks all 4 directions
	this.checkDirections = function(x_add,y_add,count){
		var tiles = [];
		tiles = tiles.concat(this.checkDirection(x_add,y_add,count));
		if(x_add != 0){
			tiles = tiles.concat(this.checkDirection(-x_add,y_add,count));
		}
		if(y_add != 0){
			tiles = tiles.concat(this.checkDirection(x_add,-y_add,count));
		}
		if(x_add != 0 && y_add != 0){
			tiles = tiles.concat(this.checkDirection(-x_add,-y_add,count));
		}
		return tiles;
	}
	
	//User clicks on the tile
	this.select = function(player){
		
		if(!game.gameActive || !game.turn || game.interfaces.screenOpen()){
			return false;
		}
		
		$('.movableTile').removeClass("movableTile");
		$('.highlight').removeClass("highlight");
		
		if(!this.empty() && this.piece.color == player.color){
			// Chooses the tile, if it's the player's
			this.highlight("highlight",true);
			player.activePiece = tile.piece;
			$('.movableTile').removeClass("movableTile");
			for(var i = 0; i < this.piece.moveTiles.length; i++){
				tile.piece.moveTiles[i].highlight("movableTile");
			}
		}else if(player.activePiece != null && player.activePiece.canMove(tile)){
			game.turn = false;
			player.activePiece.move(tile.x,tile.y);
			this.highlight("highlight",true);
			player.activePiece = null;
		}else{
			player.activePiece = null;
		}
	}
}

function Player(color,game,computer){
	this.computer = false;
	this.color = color;
	this.game = game;
	this.pieceId = 0;
	this.pieces = [];//king > queen > rook/bishop > knight > pawn
	this.kings = [];
	this.queens = [];
	this.rooks = [];
	this.bishops = [];
	this.knights = [];
	this.pawns = [];
	this.pieceCount = function(){return this.pieces.length};
	this.kingCount = function(){return this.kings.length};
	this.moveTiles = []; // Possible move tiles
	this.hitTiles = []; // Tiles the player can hit, assuming there is an enemy piece (pawns)
	this.prevTile = null; // Tile the player moved from last turn
	this.prevPiece = null; // Piece player moved last turn
	this.moveCount = 0; // How many times previous piece has been moved back-to-back
	this.activePiece = null;
	this.turn = false;
	this.enemy = null; //Defined after creation
	
	//Looks all possible tiles where pieces can move to
	this.checkAllTiles = function(){
		this.moveTiles = [];
		this.hitTiles = [];
		for(var i = 0; i < this.pieceCount(); i++){
			this.pieces[i].tileCheck();
		}
	}
	
	// Sets protectsKing value at the beginning of the turn. Need to be applied after both players have done checkAllTiles.
	this.findKingProtectors = function(){
		for(var i = 0; i < this.pieceCount(); i++){
			this.pieces[i].protectsKing = this.pieces[i].tile.protectsKing(this);
		}
	}
	
	// Goes through array of tiles and pieces and tells which combination is least risky for the piece. If many with same risk, result is randomized.
	// Returns piece, tile and risk. [piece,tile,risk]
	// Often either pieces or tiles is an array with single value
	// Is used by computer logic
	// Setting 1: pieces is 2-dimensional array: [[piece1,tile1],[piece2,tile2],[piece3,tile3],...], tiles is ignored
	this.findSmallestRisk = function(pieces,tiles,setting){
		var setting = setting || 0;
		var riskValue = 10000;
		var safest = [];
		for(var i=0;i<pieces.length;i++){
			var piece = pieces[i];
			if(setting==1){
				tiles = [piece[1]];
				piece = piece[0];
			}
			for(var j=0;j<tiles.length;j++){
				var risk = tiles[j].riskValue(piece);
				if(risk <= riskValue){
					if(risk<riskValue){
						safest = [];
					}
					safest.push([piece,tiles[j],risk])
					riskValue = risk;
				}
			}
		}
		// Return random piece/tile combination, with lowest risk
		return randVal(safest);
	}
	// Helper function for approachTile. Adds appropriate piece/tile combinations to piece_tile array and returns it back
	this.approachTileLoop = function(tiles,piece_tile, types, moveTiles, type, safe, depth){
		for(var j=0;j<tiles.length;j++){
			if((safe && tiles[j][this.enemy.color + "Hits"].length > 0)){
				continue;
			}
			if(depth == 2){ // Approach tiles from which could be approached further
				piece_tile = piece_tile.concat(this.approachTile(tiles[j],moveTiles,type,safe,1));
			}else{
				for(var k=0;k<tiles[j][this.color + "s"].length;k++){
					var piece = tiles[j][this.color + "s"][k];
					console.log(piece);
					if(!piece.protectsKing  && inArray(types, piece.type)){
						piece_tile.push([piece,tiles[j]]);
					}
				}
			}
		}
		return piece_tile;
	}
	
	// Returns an array of possible piece/tile combinations, which could allow the piece to target tile on the next turn.
	// tile: tile, moveTiles: [tile1, tile2, ...], type: "all", "bishop", "rook", "knight", safe: boolean
	// Return: [[piece1, tile1],[piece2, tile2], ...]
	this.approachTile = function(tile, moveTiles, type, safe, depth){
		var tiles = [];
		var piece_tile = []; // piece/tile combinations for approaching
		var depth = depth || 1;
		var player = this;
		if(type == 'all' || type =='rook'){
			// Horizontal and vertical, rooks and queens
			tiles = tiles.concat(tile.checkDirections(1,0,8));
			tiles = tiles.concat(tile.checkDirections(0,1,8));
			if(depth==1){
				tiles = intersection(tiles,moveTiles);
			}
			tiles = tiles.filter(function(tile){return !tile.isFriend(player);});
			piece_tile = this.approachTileLoop(tiles,piece_tile,["rook","queen"],moveTiles,"rook",safe,depth);
		}
		if(type == 'all' || type=='bishop'){
			// Diagonal, bishops and queens
			tiles = tile.checkDirections(1,1,8,false);
			if(depth==1){
				tiles = intersection(tiles,this.moveTiles);
			}
			tiles = tiles.filter(function(tile){return !tile.isFriend(player);})
			piece_tile = this.approachTileLoop(tiles,piece_tile,["bishop","queen"],moveTiles,"bishop",safe,depth);
		}
		if(type == 'all' || type == 'knight'){
			// Knight
			tiles = tile.checkDirections(2,1,1,false);
			tiles = tiles.concat(tile.checkDirections(1,2,1,false));
			if(depth==1){
				tiles = intersection(tiles,this.moveTiles);
			}
			tiles = tiles.filter(function(tile){return !tile.isFriend(player);})
			piece_tile = this.approachTileLoop(tiles,piece_tile,["knight"],moveTiles,"knight",safe,depth);
		}
		return piece_tile;
	}
	
	// Computer logic, returns the piece and the tile, [piece, tile]
	this.chooseTarget = function(){
		var safeTiles = []; // Tiles where enemy can't reach, but the player can, and movable pieces don't protect the king
		var hitTiles = []; // Enemy tiles player can hit
		var dangerTiles = []; // Player tiles enemy can hit
		var pieceLocations = []; // Tiles where player's pieces are 
		var enemyLocations = []; // Tiles where enemy's pieces are
		var enemy = this.enemy;
		var colors = this.color + "s";
		var ecolors = this.enemy.color + "s";
		
		// Find current friendly/enemy positions
		for(var i=0;i<this.pieceCount();i++){
			pieceLocations.push(this.pieces[i].tile);
		}
		for(var i=0;i<enemy.pieceCount();i++){
			enemyLocations.push(enemy.pieces[i].tile);
		}
		
		safeTiles = diff(this.moveTiles,enemy.hitTiles);
		hitTiles = intersection(this.hitTiles,enemyLocations);
		dangerTiles = intersection(enemy.moveTiles,pieceLocations);
		
		var moveTile = null;
		var movePiece = null;
		var riskValue = 100;
		
		// 1. Kill the enemy king (if possible)
		for(var i=0;i<enemy.kings.length;i++){
			if(enemy.kings[i].threats().length > 0){
				console.log("Can kill the king");
				return [randVal(enemy.kings[i].threats()),enemy.kings[i].tile];
			}
		}
		
		// 2. Protect the king (if in danger)
		for(var k=0;k<this.kings.length;k++){
			if(inArray(dangerTiles,this.kings[k].tile)){
				// King is in danger
				console.log("King in danger");
				var king = this.kings[k];
				// 2.1. Move the king, if 2 or more enemies targetting
				if(king.threats.length > 1){
					console.log("More than 1 threat");
					// More than 1 enemy, king must move (it's impossible to kill/block 2 enemies at the same time)
					var safeMoves = intersection(king.moveTiles,safeTiles); // Tiles king can go to safely
					if(safeMoves.length > 0){ 
						return this.findSmallestRisk([king],safeMoves); // Find the best tile to go to (one with an enemy, perhaps)
					}
					// If no safe moves, there is no way to safe the king - unless the opponent doesn't notice
					// (In this version the game goes on even in check-mate situation)
				}
				// 2.2 Try to kill the enemy threat
				var enemyTarget = randVal(king.tile[ecolors]);
				var movePieces = enemyTarget.threats().filter(function(piece){return !piece.protectsKing;});
				movePiece = null;
				riskValue = 10000;
				if(movePieces.length > 0){ // There is someone who can kill it, that isn't protecting the king
					console.log("Threat can be killed");
					if(enemyTarget.friends().length > 0){ // killing is risky
						moveTile = enemyTarget.tile;
						var riskInfo = this.findSmallestRisk(movePieces,[moveTile]);
						movePiece = riskInfo[0];
						riskValue = riskInfo[2];
						// Doesn't return yet, will see later on if there are better options (2.3 or 2.4)
					}else{// Killing is safe
						console.log("Killing is safe");
						return this.findSmallestRisk(movePieces,[enemyTarget.tile]);
					}
				}
				// 2.3 Move king to safety (if killing is too risky)
				var safeMoves = intersection(king.moveTiles,safeTiles); // Tiles king can go to safely
				
				// Make sure that the king doesn't go along the enemy's gaze
				if(enemyTarget.type != 'pawn' && enemyTarget.type != 'knight'){
					safeMoves = safeMoves.filter(function(tile){return !king.tile.isBetween(tile,enemyTarget.tile)})
				}
				
				if(safeMoves.length > 0 && riskValue >= 0){ 
					console.log("2.3 Move king to safety");
					return this.findSmallestRisk([king],safeMoves);
				}
				
				// 2.4 Block the enemy
				if(enemyTarget.type != "knight"){ // Knights can't be blocked
					console.log("2.4 Try to block the enemy")
					var tilesBetween = king.tile.tilesBetween(enemyTarget.tile);
					 for(var i=0;i<tilesBetween.length;i++){
						 var tile = tilesBetween[i];
						 var pieces = tile[colors].filter(function(piece){return !piece.protectsKing && piece != king});
						 if(pieces.length > 0){
							 var riskInfo = this.findSmallestRisk(pieces,[tile]);
							 var risk = riskInfo[2];
							 if(risk < riskValue){
								 moveTile = tile;
								 movePiece = riskInfo[0];
								 riskValue = risk;
							 }
						 }
					 }
				}
				 // Risky kill / Blocking depends on lowest risk. If none suitable, king will likely die.
				 if(movePiece != null && moveTile != null){
					 return [movePiece, moveTile];
				 }
			}
		}
		
		//3. Approach the king (hitting distance, if safe)
		
		if(this.moveCount <= 6){ // To reduce endless loops
			for(var i=0;i<enemy.kings.length;i++){
				var piece_tile = this.approachTile(enemy.kings[i].tile,this.moveTiles,"all",true,1);
				if(piece_tile.length > 0){
					return this.findSmallestRisk(piece_tile,[],1);
				}
			}
		}
		
		// 4. Kill enemy or move to safety, if risk is negative. 
		movePiece = null;
		moveTile = null;
		riskValue = 100;
		
		console.log("4. Kill enemy or move to safety");
		
		for(var i = 0;i<this.pieces.length;i++){
			var piece = this.pieces[i];
			// Makes sure that the piece isn't protecting the king (moving it doesn't put king at risk)
			if(piece.protectsKing){
				continue;
			}
			for(var j=0;j<piece.moveTiles.length;j++){
				var tile = piece.moveTiles[j];
				var risk = tile.riskValue(piece);
				if(risk < riskValue || (risk==riskValue && Math.random() > 0.4)){ // Some randomisation
					movePiece = piece;
					moveTile = tile;
					riskValue = risk;
				}
			}
		}
		
		
		console.log("4. Risk: ",riskValue,movePiece,moveTile);
		
		// Risk is considered to be worth it if it's negative - the more negative, the better.
		if(riskValue < 0){
			return [movePiece,moveTile];
		}
		
		// 5. Approach king from further (go to tiles from which king could be approached in priority 3., if safe)
		console.log("5. Approach king");
		for(var i=0;i<enemy.kings.length;i++){
			var piece_tile = this.approachTile(enemy.kings[i].tile,this.moveTiles,"all",true,2);
			if(piece_tile.length > 0){
				return this.findSmallestRisk(piece_tile,[],1);
			}
		}
		
		// 6. Move somewhere with a piece that isn't guarding the king
		if(movePiece != null){
			console.log("6. Safe random");
			return [movePiece,moveTile];
		}
		
		// 7. Move to random location with random piece. 
		console.log("7. Random");
		moveTile = randVal(this.moveTiles);
		movePiece = randVal(moveTile[colors]);
		return [movePiece, moveTile];
		
	}
	
}

function Piece(player,tile,type){
	this.color = player.color;
	this.white = this.color == "white";
	this.tile = tile;
	this.img = "img/" + this.color + "_" + type + ".png";
	this.id = player.pieceId;
	this.player = player;
	this.value = null; // Will be set in subclass
	player.pieces.push(this);
	player[type + "s"].push(this);
	tiles = player.game.board;
	this.moveTiles = []; // Tiles piece can move to on the next turn
	this.hitTiles = []; // Tiles piece could go to, if enemy is there
	this.threats = function(){return this.tile[this.player.enemy.color + "Hits"]}; // Returns enemies that can hit the next turn
	this.friends = function(){return this.tile[this.color + "Hits"]}; // Returns friendlies which can move to the tile after death
	this.protectsKing = false;
	var pieceDiv = '#'+ this.color + this.id;
	
	this.move = function(x,y){
		var x_css = 80*x + "px";
		var y_css = 80*y + "px";
		this.tile.piece = null;
		$(pieceDiv).delay(50).animate({left: x_css,top: y_css}, 500)
		this.player.prevTile = this.tile;
		if(this.player.prevPiece != this){
			this.player.moveCount = 0;
		}
		this.player.prevPiece = this;
		this.player.moveCount++;
		this.tile = player.game.board[x][y];
		if(!this.tile.empty()){
			this.tile.piece.die(200,300);
		}
		this.tile.piece = this;
		if(this.type == "pawn" && (x == 0 || x == 7)){ // Promotion
			this.die();
			this.player.game.addPiece(this.tile.x,this.tile.y,this.player,"Q")
		}
		var gameId = player.game.gameId;
		setTimeout(function(){
			player.game.changeTurn(gameId);
		},650);
	}
	this.canMove = function(tile){return this.moveTiles.indexOf(tile) != -1;}
	
	//Checks 1 direction. Stops if an obstacle comes in the way.
	this.checkDirection = function(x_add,y_add,count,roundStart){
		var moveTiles = this.tile.checkDirection(x_add,y_add,count);
		
		for(var i=0;i<moveTiles.length;i++){
			var target = moveTiles[i];
			this.hitTiles.push(target);
			target.addHitter(this);
			if(target.isFriend(this)){
				del(moveTiles,target);
			}
		}
		return moveTiles;
	}
	//Checks all 4 directions
	this.checkDirections = function(x_add,y_add,count,roundStart){
		var moveTiles = [];
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
	//Removes information of piece's current possible move locations from player/tiles. Done before checking them again.
	this.clearTiles = function(){
		del(this.player.moveTiles,this.tile);
		this.moveTiles = [];		
		this.hitTiles = [];
	}
	//Adds piece's possible move locations to player and tiles
	this.addTiles = function(){
		var tiles = this.moveTiles
		for(var i = 0; i < tiles.length; i++){
			this.player.moveTiles.push(tiles[i]);
			tiles[i].addMover(this);
		}
		this.player.hitTiles = this.player.hitTiles.concat(this.hitTiles);
	}
	this.tileCheck = function(){
		//Defined in subclasses
	}
	this.die = function(delay,time){
		this.clearTiles();
		del(this.player.pieces,this);
		del(this.player[type + "s"],this);
		if(this.type != "pawn" || this.tile.x != 0 || this.tile.y != 7){
			this.player.game.interfaces.changeText(this.color + "_count",this.player.pieceCount());
		}
		setTimeout(function(){
			$(pieceDiv).fadeOut(time);
			},delay);
		// Check if the game has ended
		if(this.type == "king"){
			if(player.kingCount() == 0){
				player.game.gameOver(player);
			}
		}else if(player.pieceCount() == 0){
			player.game.gameOver(player);
		}
	}
}

function Pawn(player,tile){
	this.type = "pawn";
	Piece.apply(this,[player,tile,this.type]);
	this.value = 1;
	this.xStart = tile.x;
	this.yStart = tile.y;
	this.tileCheck = function(){
		this.clearTiles();
		var x = this.tile.x;
		var y = this.tile.y;
		var dir = this.white ? 1 : -1;
		var tile = tiles[x+dir][y];
		
		if(tile.empty()){
			this.moveTiles.push(tile);
		}
		if(0 <= x+2*dir && x+2*dir < 8 && this.xStart == x && tile.empty()){
			tile = tiles[x+2*dir][y];
			if(tile.empty()){
				this.moveTiles.push(tile);
			}
		}
		if(y+1 < 8){
			tile = tiles[x+dir][y+1];
			if(!tile.isFriend(this) && !tile.empty()){
				this.moveTiles.push(tile);
			}
			this.hitTiles.push(tile);
			tile.addHitter(this);
		}
		if(y-1 >= 0){
			tile = tiles[x+dir][y-1];
			if(!tile.isFriend(this) && !tile.empty()){
				this.moveTiles.push(tile);
			}
			this.hitTiles.push(tile);
			tile.addHitter(this);
		}
		this.addTiles();
	}
}
function Rook(player,tile){
	this.type = "rook";
	Piece.apply(this,[player,tile,this.type]);
	this.value = 5;
	this.tileCheck = function(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,8,true));
		this.addTiles();
	}
}
function Bishop(player,tile){
	this.type = "bishop";
	Piece.apply(this,[player,tile,this.type]);
	this.value = 5;
	this.tileCheck = function(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,8,true));
		this.addTiles();
	}
}
function Knight(player,tile){
	this.type = "knight";
	Piece.apply(this,[player,tile,this.type]);
	this.value = 4;
	this.tileCheck = function(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(2,1,1,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,2,1,true));
		this.addTiles();
	}
}
function Queen(player,tile){
	this.type = "queen";
	Piece.apply(this,[player,tile,this.type]);
	this.value = 7;
	this.tileCheck = function(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,8,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,7,true));
		this.addTiles();
	}
}
function King(player,tile){
	this.type = "king";
	Piece.apply(this,[player,tile,this.type]);
	this.value = 10;
	this.tileCheck = function(){
		this.clearTiles();
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,0,1,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(0,1,1,true));
		this.moveTiles = this.moveTiles.concat(this.checkDirections(1,1,1,true));
		this.addTiles();
	}
}