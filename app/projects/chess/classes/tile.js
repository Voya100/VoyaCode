"use strict";
var Tile = (function () {
    function Tile(x, y, game) {
        this.highlighted = false;
        this.whites = []; // Whites who can move to the tile
        this.whiteHits = []; // Whites who could hit the tile, if there was an enemy
        this.blacks = []; // Blacks who can move to the tile
        this.blackHits = []; // Blacks who could hit the tile, if there was an enemy
        this.x = x;
        this.y = y;
        this.game = game;
        this.board = game.board;
    }
    // True if there is a piece on the tile, false otherwise
    Tile.prototype.empty = function () { return this.piece == null; };
    // True if this tile has a piece with same color as piece given by parameter
    Tile.prototype.isFriend = function (piece) {
        return !this.empty() && this.piece.color == piece.color;
    };
    // Tells if piece on this tile is preventing enemy from going to target tile
    Tile.prototype.protectsTile = function (targetTile, player) {
        // Doesn't protect, if there are pieces between this and the tile
        if (this.tilesBetween(targetTile) === false || this.tilesBetween(targetTile).filter(function (tile) { return !tile.empty(); }).length > 0) {
            return false;
        }
        if (this.x == targetTile.x) {
            var y_dir = this.y < targetTile.y ? -1 : 1;
            for (var y = this.y + y_dir; 0 <= y && y < 8; y += y_dir) {
                var tile = this.game.board[this.x][y];
                if (!tile.empty() && tile.piece.color != player.color && (tile.piece.type == 'rook' || tile.piece.type == 'queen')) {
                    return true;
                }
                else if (!tile.empty()) {
                    break;
                }
            }
        }
        if (this.y == targetTile.y) {
            var x_dir = this.x < targetTile.x ? -1 : 1;
            for (var x = this.x + x_dir; 0 <= x && x < 8; x += x_dir) {
                var tile = this.game.board[x][this.y];
                if (!tile.empty() && tile.piece.color != player.color && (tile.piece.type == 'rook' || tile.piece.type == 'queen')) {
                    return true;
                }
                else if (!tile.empty()) {
                    break;
                }
            }
        }
        if (Math.abs(this.y - targetTile.y) == Math.abs(this.x - targetTile.x)) {
            var x_dir = this.x < targetTile.x ? -1 : 1;
            var y_dir = this.y < targetTile.y ? -1 : 1;
            for (var x = this.x + x_dir, y = this.y + y_dir; 0 <= x && x < 8 && 0 <= y && y < 8; x += x_dir, y += y_dir) {
                var tile = this.game.board[x][y];
                if (!tile.empty() && tile.piece.color != player.color && (tile.piece.type == 'bishop' || tile.piece.type == 'queen')) {
                    return true;
                }
                else if (!tile.empty()) {
                    break;
                }
            }
        }
        return false;
    };
    // Tells if tile is protecting king (is between it and enemy piece)
    Tile.prototype.protectsKing = function (player) {
        if (player.kings.length == 0 || (!this.empty() && this.piece.type == 'king')) {
            return false;
        }
        var kingTile = player.kings[0].tile;
        return this.protectsTile(kingTile, player);
    };
    // Evaluates the risk vs reward of moving the piece to this tile. If risk is negative, it's generally worth doing.
    Tile.prototype.riskValue = function (piece) {
        var risk = 0;
        var threats = this[piece.player.enemy.color + "Hits"]; // Enemies who can attack tile
        var friendlies = this[piece.color + "Hits"]; // Player's pieces which can attack the tile, if captured by enemy
        var piecesThreats = piece.threats(); // Enemies who can attack piece's current location
        // Enemy can hit this tile now, or after moving to it
        if (threats.length > 0 || piece.tile.protectsTile(this, piece.player)) {
            risk += piece.value;
            // Risk is reduced if there are frienly pieces looking over the tile. Doesn't work if piece is more valuable than threats.
            if (threats.length > 0 && friendlies.length > 1 && this.game.lowestTile(threats, false).piece.value >= piece.value) {
                risk -= 2;
            }
            if (piece.type == "king") {
                risk += 100;
            }
        }
        // Risk is reduced if current location is already risky
        if (piecesThreats.length >= 1 && piece.friends().length == 0) {
            risk -= piece.value / 2;
        }
        else if (piecesThreats.length >= 1 && this.game.lowestTile(piecesThreats, false).piece.value < piece.value) {
            risk -= piece.value / 3;
        }
        // Prevents opening a weak spot, which can't be defended in start of the game
        if (piece.type == 'pawn'
            && ((piece.color == 'black' && piece.tile.x == 6 && piece.tile.y == 5) || (piece.color == 'white' && piece.tile.x == 1 && piece.tile.y == 2))
            && piece.friends().length == 1) {
            risk += 2;
        }
        // Risk is reduced if moving kills an enemy (risk vs reward)
        if (!this.empty() && this.piece.color != piece.color) {
            risk -= this.piece.value;
        }
        // Risk is increased, if current tile protects a more valuable tile
        if (piece.value <= 5) {
            var valuablePieces;
            if (piece.type == 'pawn') {
                valuablePieces = _.difference(piece.player.pieces, piece.player.pawns);
            }
            else {
                valuablePieces = piece.player.queens;
            }
            for (var i = 0; i < valuablePieces.length; i++) {
                var valPiece = valuablePieces[i];
                if (piece.tile.protectsTile(valPiece.tile, piece.player) && valPiece.friends().length == 0 && !this.protectsTile(valPiece.tile, piece.player)) {
                    risk += valPiece.value / 2;
                    break;
                }
            }
        }
        // Small prevention to doing same moves again
        if (piece.player.prevTile == this) {
            risk += 0.3;
        }
        // Small prevention to moving between safe tiles with same piece
        if (piece.player.prevPiece == piece) {
            risk += 0.1 * piece.player.moveCount;
        }
        console.log("Risk", piece, this, risk);
        return risk;
    };
    // Removes same highlight from other tiles and gives it to this one
    Tile.prototype.highlight = function (type, unique) {
        // TODO: remove highlight from other tiles
        this.highlighted = true;
    };
    // Adds a piece that can move to this tile
    Tile.prototype.addMover = function (piece) {
        if (piece.white) {
            this.whites.push(piece);
        }
        else {
            this.blacks.push(piece);
        }
    };
    // Adds a piece that could hit this tile (if there is an enemy)
    Tile.prototype.addHitter = function (piece) {
        if (piece.white) {
            this.whiteHits.push(piece);
        }
        else {
            this.blackHits.push(piece);
        }
    };
    Tile.prototype.clear = function () {
        this.whites = [];
        this.whiteHits = [];
        this.blacks = [];
        this.blackHits = [];
    };
    // Returns tiles between the two tiles
    Tile.prototype.tilesBetween = function (tile) {
        var x_add = 0, y_add = 0;
        // Checks that they are on same column/row or diagonal
        if (this.x != tile.x && this.y != tile.y && Math.abs(this.x - tile.x) != Math.abs(this.y - tile.y)) {
            return false;
        }
        if (this.x != tile.x) {
            x_add = this.x < tile.x ? 1 : -1;
        }
        if (this.y != tile.y) {
            y_add = this.y < tile.y ? 1 : -1;
        }
        var tiles = [];
        for (var x = this.x + x_add, y = this.y + y_add; y != tile.y || x != tile.x; x += x_add, y += y_add) {
            tiles.push(this.game.board[x][y]);
        }
        return tiles;
    };
    // Checks if tile is between 2 tiles
    Tile.prototype.isBetween = function (targetTile, enemyTile) {
        var x_min = Math.min(targetTile.x, enemyTile.x), x_max = Math.max(targetTile.x, enemyTile.x);
        var y_min = Math.min(targetTile.y, enemyTile.y), y_max = Math.max(targetTile.y, enemyTile.y);
        // Same row/column
        if ((this.x == targetTile.x && targetTile.x == enemyTile.x && y_min < this.y && this.y < y_max)
            || this.y == targetTile.y && targetTile.y == enemyTile.y && x_min < this.x && this.x < x_max) {
            return true;
        }
        else if (Math.abs(this.x - targetTile.x) == Math.abs(this.y - targetTile.y)
            && Math.abs(this.x - enemyTile.x) == Math.abs(this.y - enemyTile.y)
            && Math.abs(enemyTile.x - targetTile.x) == Math.abs(enemyTile.y - targetTile.y)) {
            return true;
        }
        else {
            return false;
        }
    };
    // Returns tiles in specific direction, until it meets an obstacle (end of board or piece)
    Tile.prototype.checkDirection = function (x_add, y_add, count) {
        if (count != 1) {
            count = 8;
        }
        var tiles = [];
        var x = this.x;
        var y = this.y;
        for (var i = 1; i < count + 1; i++) {
            if (x + x_add * i < 8 && x + x_add * i >= 0 && y + y_add * i < 8 && y + y_add * i >= 0) {
                var tile = this.board[x + x_add * i][y + y_add * i];
                tiles.push(tile);
                if (!tile.empty()) {
                    break;
                }
            }
        }
        return tiles;
    };
    //Checks all 4 directions
    Tile.prototype.checkDirections = function (x_add, y_add, count) {
        var tiles = [];
        tiles = tiles.concat(this.checkDirection(x_add, y_add, count));
        if (x_add != 0) {
            tiles = tiles.concat(this.checkDirection(-x_add, y_add, count));
        }
        if (y_add != 0) {
            tiles = tiles.concat(this.checkDirection(x_add, -y_add, count));
        }
        if (x_add != 0 && y_add != 0) {
            tiles = tiles.concat(this.checkDirection(-x_add, -y_add, count));
        }
        return tiles;
    };
    //User clicks on the tile
    Tile.prototype.select = function (player) {
        if (!this.game.gameActive || !this.game.turn) {
            // TODO: Add inteface open check?
            return false;
        }
        // TODO: Remove highlight from all tiles
        if (!this.empty() && this.piece.color == player.color) {
            // Chooses the tile, if it's the player's
            this.highlight("highlight", true);
            player.activePiece = this.piece;
            // TODO: Remove movable tile
            for (var i = 0; i < this.piece.moveTiles.length; i++) {
                this.piece.moveTiles[i].highlight("movableTile");
            }
        }
        else if (player.activePiece != null && player.activePiece.canMove(this)) {
            this.game.turn = false;
            player.activePiece.move(this.x, this.y);
            this.highlight("highlight", true);
            player.activePiece = null;
        }
        else {
            player.activePiece = null;
        }
    };
    return Tile;
}());
exports.Tile = Tile;
//# sourceMappingURL=tile.js.map