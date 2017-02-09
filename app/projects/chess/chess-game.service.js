"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var player_1 = require('./classes/player');
var tile_1 = require('./classes/tile');
var bishop_1 = require('./classes/bishop');
var king_1 = require('./classes/king');
var knight_1 = require('./classes/knight');
var pawn_1 = require('./classes/pawn');
var queen_1 = require('./classes/queen');
var rook_1 = require('./classes/rook');
var ChessGameService = (function () {
    function ChessGameService() {
        this.defaultPositions = ["RKBXQBKR",
            "PPPPPPPP"];
        // Settings
        this.positions = this.defaultPositions;
        this.whiteComputer = false;
        this.blackComputer = true;
        // Properties, are set in reset
        this.board = [];
        this.gameActive = false;
        this.gameId = 0;
        // Changes piece layout back to default, and resets the game
        this.resetLayout = function () {
            // TODO: Is this needed?
            /*
                $('#pieceRow1').val(this.defaultPositions[0]);
                $('#pieceRow2').val(this.defaultPositions[1]);
            */
            this.settingUpdate();
        };
    }
    // Makes empty tiles for the board
    ChessGameService.prototype.fillBoard = function () {
        this.board = [];
        for (var i = 0; i < 8; i++) {
            this.board[i] = [];
            for (var j = 0; j < 8; j++) {
                this.board[i][j] = new tile_1.Tile(i, j, this);
            }
        }
    };
    // Adds piece to the board
    ChessGameService.prototype.addPiece = function (x, y, player, type) {
        var piece;
        var tile = this.board[x][y];
        player.pieceId++;
        switch (type) {
            case "P":
                piece = new pawn_1.Pawn(player, tile);
                break;
            case "R":
                piece = new rook_1.Rook(player, tile);
                break;
            case "B":
                piece = new bishop_1.Bishop(player, tile);
                break;
            case "K":
                piece = new knight_1.Knight(player, tile);
                break;
            case "Q":
                piece = new queen_1.Queen(player, tile);
                break;
            case "X":
                piece = new king_1.King(player, tile);
                break;
            default:
                piece = null;
                return;
        }
        this.board[x][y].piece = piece;
        var id = player.color + player.pieceId;
        //Promotion (TODO?)
    };
    // Sets the board and adds all the pieces
    ChessGameService.prototype.setUp = function () {
        this.fillBoard();
        var row1 = this.positions[0] + "_".repeat(8 - this.positions[0].length);
        var row2 = this.positions[1] + "_".repeat(8 - this.positions[1].length);
        var row1b = row1.split("").reverse().join(""); // Black rows are mirrored
        var row2b = row2.split("").reverse().join("");
        for (var i = 0; i < 8; i++) {
            this.addPiece(0, i, this.white, row1[i]);
            this.addPiece(7, i, this.black, row1b[i]);
            this.addPiece(1, i, this.white, row2[i]);
            this.addPiece(6, i, this.black, row2b[i]);
        }
        this.clearTiles();
        this.white.checkAllTiles();
        this.black.checkAllTiles();
        this.white.findKingProtectors();
        this.black.findKingProtectors();
        this.turn = true;
    };
    ChessGameService.prototype.reset = function () {
        this.gameActive = false;
        this.gameId++;
        this.board = [];
        this.white = new player_1.Player("white", this, this.whiteComputer);
        this.black = new player_1.Player("black", this, this.blackComputer);
        this.white.enemy = this.black;
        this.black.enemy = this.white;
        this.activePlayer = this.white;
        this.round = 1;
        // TODO remove old pieces and remove highlights (?)
        if (this.gameId > 1) {
        }
        this.setUp();
        this.updateStats();
        this.gameActive = true;
        this.turn = true;
        this.computerCheck();
    };
    // Update side interface
    ChessGameService.prototype.updateStats = function () {
        // TODO: Remove this
        //this.interfaces.updateStats(this.activePlayer.color,this.round,this.white.pieces.length,this.black.pieces.length);
    };
    ChessGameService.prototype.makeTurn = function (tile) {
        if (this.turn) {
            tile.select(this.activePlayer);
        }
    };
    // Checks if computer should make a move, and makes the move
    ChessGameService.prototype.computerCheck = function () {
        if (this.activePlayer.computer && this.gameActive && this.turn) {
            var choice = this.activePlayer.chooseTarget();
            var piece = choice[0];
            var tile = choice[1];
            console.log(piece, tile);
            this.makeTurn(piece.tile);
            this.makeTurn(tile);
        }
    };
    ChessGameService.prototype.gameOver = function (loser) {
        var winner = loser.enemy;
        this.gameActive = false;
        // TODO: show win message
        /*
            interfaces.changeText("win_message",winner.color.capitalize() + " wins!");
            interfaces.open("win_screen");
        */
    };
    // Changes turn and does situation checks one a turn has ended
    ChessGameService.prototype.changeTurn = function (gameId) {
        if (gameId == this.gameId) {
            this.clearTiles();
            this.white.checkAllTiles();
            this.black.checkAllTiles();
            this.white.findKingProtectors();
            this.black.findKingProtectors();
            this.activePlayer = this.activePlayer.enemy;
            this.turn = true;
            if (this.activePlayer.color == "white") {
                this.round += 1;
            }
            this.updateStats();
            this.computerCheck(); // Computer's possible move
        }
    };
    // Returns the tile that has a piece with lowest value (used to avoid excess risk)
    // TODO: Move somewhere else, maybe?
    ChessGameService.prototype.lowestTile = function (tiles, isTile) {
        var lowest = 100;
        var tile = tiles[0];
        for (var i = 0; i < tiles.length; i++) {
            if (isTile) {
                if (!tiles[i].empty() && tiles[i].piece.value < lowest) {
                    lowest = tiles[i].piece.value;
                    tile = tiles[i];
                }
            }
            else {
                if (tiles[i].value < lowest) {
                    lowest = tiles[i].value;
                    tile = tiles[i].tile;
                }
            }
        }
        return tile;
    };
    // Removes move information from all tiles (done before adding new ones)
    ChessGameService.prototype.clearTiles = function () {
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                this.board[i][j].clear();
            }
        }
    };
    // Changes piece layout to user input, and resets the game
    ChessGameService.prototype.settingUpdate = function () {
        // TODO: Is this needed?
        /*
            var row1 = $('#pieceRow1').val();
            var row2 = $('#pieceRow2').val();
            this.positions = [row1,row2];
        */
        this.reset();
    };
    // Changes game mode and resets the game
    ChessGameService.prototype.changeMode = function (mode) {
        switch (mode) {
            case 0:
                this.whiteComputer = false;
                this.blackComputer = true;
                break;
            case 1:
                this.whiteComputer = false;
                this.blackComputer = false;
                break;
            case 2:
                this.whiteComputer = true;
                this.blackComputer = true;
                break;
        }
        this.reset();
    };
    ChessGameService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChessGameService);
    return ChessGameService;
}());
exports.ChessGameService = ChessGameService;
//# sourceMappingURL=chess-game.service.js.map