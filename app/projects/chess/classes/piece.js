"use strict";
var _ = require('underscore');
var Piece = (function () {
    function Piece(player, tile) {
        // Tiles piece can move to on the next turn
        this.moveTiles = [];
        // Tiles piece could go to, if enemy is there
        this.hitTiles = [];
        this.dead = false;
        // Returns friendlies which can move to the tile after death	
        this.friends = function () { return this.tile[this.color + "Hits"]; };
        // Returns enemies that can hit the next turn
        this.threats = function () { return this.tile[this.player.enemy.color + "Hits"]; };
        this.color = player.color;
        this.white = this.color == "white;";
        this.tile = tile;
        this.player = player;
        //player.pieces.push(this);
        //player[type + "s"].push(this);
        this.tiles = player.game.board;
        this.moveTiles = [];
        this.hitTiles = [];
        this.protectsKing = false;
    }
    Piece.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
        this.tile.piece = null;
        this.player.prevTile = this.tile;
        if (this.player.prevPiece != this) {
            this.player.moveCount = 0;
        }
        this.player.prevPiece = this;
        this.player.moveCount++;
        this.tile = this.player.game.board[x][y];
        if (!this.tile.empty()) {
            this.tile.piece.die(200, 300);
        }
        this.tile.piece = this;
        if (this.type == "pawn" && (x == 0 || x == 7)) {
            this.die();
            this.player.game.addPiece(this.tile.x, this.tile.y, this.player, "Q");
        }
        var gameId = this.player.game.gameId;
        setTimeout(function () {
            this.player.game.changeTurn(gameId);
        }, 650);
    };
    Piece.prototype.canMove = function (tile) { return this.moveTiles.indexOf(tile) != -1; };
    //Checks 1 direction. Stops if an obstacle comes in the way.
    Piece.prototype.checkDirection = function (x_add, y_add, count, roundStart) {
        var moveTiles = this.tile.checkDirection(x_add, y_add, count);
        for (var i = 0; i < moveTiles.length; i++) {
            var target = moveTiles[i];
            this.hitTiles.push(target);
            target.addHitter(this);
            if (target.isFriend(this)) {
                moveTiles = _.without(moveTiles, target);
            }
        }
        return moveTiles;
    };
    //Checks all 4 directions
    Piece.prototype.checkDirections = function (x_add, y_add, count, roundStart) {
        var moveTiles = [];
        moveTiles = moveTiles.concat(this.checkDirection(x_add, y_add, count, roundStart));
        if (x_add != 0) {
            moveTiles = moveTiles.concat(this.checkDirection(-x_add, y_add, count, roundStart));
        }
        if (y_add != 0) {
            moveTiles = moveTiles.concat(this.checkDirection(x_add, -y_add, count, roundStart));
        }
        if (x_add != 0 && y_add != 0) {
            moveTiles = moveTiles.concat(this.checkDirection(-x_add, -y_add, count, roundStart));
        }
        return moveTiles;
    };
    // Removes information of piece's current possible move locations from player/tiles. Done before checking them again.
    Piece.prototype.clearTiles = function () {
        this.player.moveTiles = _.without(this.player.moveTiles, this.tile);
        this.moveTiles = [];
        this.hitTiles = [];
    };
    //Adds piece's possible move locations to player and tiles
    Piece.prototype.addTiles = function () {
        var tiles = this.moveTiles;
        for (var i = 0; i < tiles.length; i++) {
            this.player.moveTiles.push(tiles[i]);
            tiles[i].addMover(this);
        }
        this.player.hitTiles = this.player.hitTiles.concat(this.hitTiles);
    };
    Piece.prototype.die = function (delay, time) {
        this.clearTiles();
        this.player.pieces = _.without(this.player.pieces, this);
        this.player[this.type + "s"] = _.without(this.player[this.type + "s"], this);
        if (this.type != "pawn" || this.tile.x != 0 || this.tile.y != 7) {
        }
        this.dead = true;
        // Check if the game has ended
        if (this.type == "king") {
            if (this.player.kingCount() == 0) {
                this.player.game.gameOver(this.player);
            }
        }
        else if (this.player.pieceCount() == 0) {
            this.player.game.gameOver(this.player);
        }
    };
    return Piece;
}());
exports.Piece = Piece;
//# sourceMappingURL=piece.js.map