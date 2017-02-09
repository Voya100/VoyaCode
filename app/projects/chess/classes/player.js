"use strict";
function randVal(array) {
    return array[Math.floor(Math.random() * array.length)];
}
var Player = (function () {
    function Player(color, game, computer) {
        this.pieceId = 0;
        this.pieces = [];
        this.kings = [];
        this.queens = [];
        this.rooks = [];
        this.bishops = [];
        this.knights = [];
        this.pawns = [];
        // Possible move tiles
        this.moveTiles = [];
        // Tiles the player can hit, assuming there is an enemy piece (pawns)
        this.hitTiles = [];
        // Tile the player moved from last turn
        this.prevTile = null;
        // Piece player moved last turn
        this.prevPiece = null;
        // How many times previous piece has been moved back-to-back
        this.moveCount = 0;
        this.activePiece = null;
        this.turn = false;
        this.enemy = null; //Defined after creation
        this.color = color;
        this.game = game;
        this.pieceId = 0;
    }
    Player.prototype.pieceCount = function () { return this.pieces.length; };
    ;
    Player.prototype.kingCount = function () { return this.kings.length; };
    ;
    //Looks all possible tiles where pieces can move to
    Player.prototype.checkAllTiles = function () {
        this.moveTiles = [];
        this.hitTiles = [];
        for (var i = 0; i < this.pieceCount(); i++) {
            this.pieces[i].tileCheck();
        }
    };
    // Sets protectsKing value at the beginning of the turn. Need to be applied after both players have done checkAllTiles.
    Player.prototype.findKingProtectors = function () {
        for (var i = 0; i < this.pieceCount(); i++) {
            this.pieces[i].protectsKing = this.pieces[i].tile.protectsKing(this);
        }
    };
    // Goes through array of tiles and pieces and tells which combination is least risky for the piece. If many with same risk, result is randomized.
    // Returns piece, tile and risk. [piece,tile,risk]
    // Often either pieces or tiles is an array with single value
    // Is used by computer logic
    // Setting 1: pieces is 2-dimensional array: [[piece1,tile1],[piece2,tile2],[piece3,tile3],...], tiles is ignored
    Player.prototype.findSmallestRisk = function (pieces, tiles, setting) {
        var setting = setting || 0;
        var riskValue = 10000;
        var safest = [];
        for (var i = 0; i < pieces.length; i++) {
            var piece = pieces[i];
            if (setting == 1) {
                tiles = [piece[1]];
                piece = piece[0];
            }
            for (var j = 0; j < tiles.length; j++) {
                var risk = tiles[j].riskValue(piece);
                if (risk <= riskValue) {
                    if (risk < riskValue) {
                        safest = [];
                    }
                    safest.push([piece, tiles[j], risk]);
                    riskValue = risk;
                }
            }
        }
        // Return random piece/tile combination, with lowest risk
        return randVal(safest);
    };
    // Helper function for approachTile. Adds appropriate piece/tile combinations to piece_tile array and returns it back
    Player.prototype.approachTileLoop = function (tiles, piece_tile, types, moveTiles, type, safe, depth) {
        for (var j = 0; j < tiles.length; j++) {
            if ((safe && tiles[j][this.enemy.color + "Hits"].length > 0)) {
                continue;
            }
            if (depth == 2) {
                piece_tile = piece_tile.concat(this.approachTile(tiles[j], moveTiles, type, safe, 1));
            }
            else {
                for (var k = 0; k < tiles[j][this.color + "s"].length; k++) {
                    var piece = tiles[j][this.color + "s"][k];
                    console.log(piece);
                    if (!piece.protectsKing && _.contains(types, piece.type)) {
                        piece_tile.push([piece, tiles[j]]);
                    }
                }
            }
        }
        return piece_tile;
    };
    // Returns an array of possible piece/tile combinations, which could allow the piece to target tile on the next turn.
    // tile: tile, moveTiles: [tile1, tile2, ...], type: "all", "bishop", "rook", "knight", safe: boolean
    // Return: [[piece1, tile1],[piece2, tile2], ...]
    Player.prototype.approachTile = function (tile, moveTiles, type, safe, depth) {
        var tiles = [];
        var piece_tile = []; // piece/tile combinations for approaching
        var depth = depth || 1;
        var player = this;
        if (type == 'all' || type == 'rook') {
            // Horizontal and vertical, rooks and queens
            tiles = tiles.concat(tile.checkDirections(1, 0, 8));
            tiles = tiles.concat(tile.checkDirections(0, 1, 8));
            if (depth == 1) {
                tiles = _.intersection(tiles, moveTiles);
            }
            tiles = tiles.filter(function (tile) { return !tile.isFriend(player); });
            piece_tile = this.approachTileLoop(tiles, piece_tile, ["rook", "queen"], moveTiles, "rook", safe, depth);
        }
        if (type == 'all' || type == 'bishop') {
            // Diagonal, bishops and queens
            tiles = tile.checkDirections(1, 1, 8);
            if (depth == 1) {
                tiles = _.intersection(tiles, this.moveTiles);
            }
            tiles = tiles.filter(function (tile) { return !tile.isFriend(player); });
            piece_tile = this.approachTileLoop(tiles, piece_tile, ["bishop", "queen"], moveTiles, "bishop", safe, depth);
        }
        if (type == 'all' || type == 'knight') {
            // Knight
            tiles = tile.checkDirections(2, 1, 1);
            tiles = tiles.concat(tile.checkDirections(1, 2, 1));
            if (depth == 1) {
                tiles = _.intersection(tiles, this.moveTiles);
            }
            tiles = tiles.filter(function (tile) { return !tile.isFriend(player); });
            piece_tile = this.approachTileLoop(tiles, piece_tile, ["knight"], moveTiles, "knight", safe, depth);
        }
        return piece_tile;
    };
    // Computer logic, returns the piece and the tile, [piece, tile]
    Player.prototype.chooseTarget = function () {
        var safeTiles = []; // Tiles where enemy can't reach, but the player can, and movable pieces don't protect the king
        var hitTiles = []; // Enemy tiles player can hit
        var dangerTiles = []; // Player tiles enemy can hit
        var pieceLocations = []; // Tiles where player's pieces are 
        var enemyLocations = []; // Tiles where enemy's pieces are
        var enemy = this.enemy;
        var colors = this.color + "s";
        var ecolors = this.enemy.color + "s";
        // Find current friendly/enemy positions
        for (var i = 0; i < this.pieceCount(); i++) {
            pieceLocations.push(this.pieces[i].tile);
        }
        for (var i = 0; i < enemy.pieceCount(); i++) {
            enemyLocations.push(enemy.pieces[i].tile);
        }
        safeTiles = _.difference(this.moveTiles, enemy.hitTiles);
        hitTiles = _.intersection(this.hitTiles, enemyLocations);
        dangerTiles = _.intersection(enemy.moveTiles, pieceLocations);
        var moveTile = null;
        var movePiece = null;
        var riskValue = 100;
        // 1. Kill the enemy king (if possible)
        for (var i = 0; i < enemy.kings.length; i++) {
            if (enemy.kings[i].threats().length > 0) {
                console.log("Can kill the king");
                return [randVal(enemy.kings[i].threats()), enemy.kings[i].tile];
            }
        }
        // 2. Protect the king (if in danger)
        var _loop_1 = function() {
            if (_.contains(dangerTiles, this_1.kings[k].tile)) {
                // King is in danger
                console.log("King in danger");
                var king_1 = this_1.kings[k];
                // 2.1. Move the king, if 2 or more enemies targetting
                if (king_1.threats.length > 1) {
                    console.log("More than 1 threat");
                    // More than 1 enemy, king must move (it's impossible to kill/block 2 enemies at the same time)
                    safeMoves = _.intersection(king_1.moveTiles, safeTiles); // Tiles king can go to safely
                    if (safeMoves.length > 0) {
                        return { value: this_1.findSmallestRisk([king_1], safeMoves) }; // Find the best tile to go to (one with an enemy, perhaps)
                    }
                }
                // 2.2 Try to kill the enemy threat
                enemyTarget = randVal(king_1.tile[ecolors]);
                movePieces = enemyTarget.threats().filter(function (piece) { return !piece.protectsKing; });
                movePiece = null;
                riskValue = 10000;
                if (movePieces.length > 0) {
                    console.log("Threat can be killed");
                    if (enemyTarget.friends().length > 0) {
                        moveTile = enemyTarget.tile;
                        riskInfo = this_1.findSmallestRisk(movePieces, [moveTile]);
                        movePiece = riskInfo[0];
                        riskValue = riskInfo[2];
                    }
                    else {
                        console.log("Killing is safe");
                        return { value: this_1.findSmallestRisk(movePieces, [enemyTarget.tile]) };
                    }
                }
                // 2.3 Move king to safety (if killing is too risky)
                safeMoves = _.intersection(king_1.moveTiles, safeTiles); // Tiles king can go to safely
                // Make sure that the king doesn't go along the enemy's gaze
                if (enemyTarget.type != 'pawn' && enemyTarget.type != 'knight') {
                    safeMoves = safeMoves.filter(function (tile) { return !king_1.tile.isBetween(tile, enemyTarget.tile); });
                }
                if (safeMoves.length > 0 && riskValue >= 0) {
                    console.log("2.3 Move king to safety");
                    return { value: this_1.findSmallestRisk([king_1], safeMoves) };
                }
                // 2.4 Block the enemy
                if (enemyTarget.type != "knight") {
                    console.log("2.4 Try to block the enemy");
                    tilesBetween = king_1.tile.tilesBetween(enemyTarget.tile);
                    for (i = 0; i < tilesBetween.length; i++) {
                        tile = tilesBetween[i];
                        pieces = tile[colors].filter(function (piece) { return !piece.protectsKing && piece != king_1; });
                        if (pieces.length > 0) {
                            riskInfo = this_1.findSmallestRisk(pieces, [tile]);
                            risk = riskInfo[2];
                            if (risk < riskValue) {
                                moveTile = tile;
                                movePiece = riskInfo[0];
                                riskValue = risk;
                            }
                        }
                    }
                }
                // Risky kill / Blocking depends on lowest risk. If none suitable, king will likely die.
                if (movePiece != null && moveTile != null) {
                    return { value: [movePiece, moveTile] };
                }
            }
        };
        var this_1 = this;
        var safeMoves, enemyTarget, movePieces, riskInfo, , tilesBetween, i, tile, pieces, , risk;
        for (var k = 0; k < this.kings.length; k++) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object") return state_1.value;
        }
        //3. Approach the king (hitting distance, if safe)
        if (this.moveCount <= 6) {
            for (var i = 0; i < enemy.kings.length; i++) {
                var piece_tile = this.approachTile(enemy.kings[i].tile, this.moveTiles, "all", true, 1);
                if (piece_tile.length > 0) {
                    return this.findSmallestRisk(piece_tile, [], 1);
                }
            }
        }
        // 4. Kill enemy or move to safety, if risk is negative. 
        movePiece = null;
        moveTile = null;
        riskValue = 100;
        console.log("4. Kill enemy or move to safety");
        for (var i = 0; i < this.pieces.length; i++) {
            var piece = this.pieces[i];
            // Makes sure that the piece isn't protecting the king (moving it doesn't put king at risk)
            if (piece.protectsKing) {
                continue;
            }
            for (var j = 0; j < piece.moveTiles.length; j++) {
                var tile_1 = piece.moveTiles[j];
                var risk_1 = tile_1.riskValue(piece);
                if (risk_1 < riskValue || (risk_1 == riskValue && Math.random() > 0.4)) {
                    movePiece = piece;
                    moveTile = tile_1;
                    riskValue = risk_1;
                }
            }
        }
        console.log("4. Risk: ", riskValue, movePiece, moveTile);
        // Risk is considered to be worth it if it's negative - the more negative, the better.
        if (riskValue < 0) {
            return [movePiece, moveTile];
        }
        // 5. Approach king from further (go to tiles from which king could be approached in priority 3., if safe)
        console.log("5. Approach king");
        for (var i = 0; i < enemy.kings.length; i++) {
            var piece_tile = this.approachTile(enemy.kings[i].tile, this.moveTiles, "all", true, 2);
            if (piece_tile.length > 0) {
                return this.findSmallestRisk(piece_tile, [], 1);
            }
        }
        // 6. Move somewhere with a piece that isn't guarding the king
        if (movePiece != null) {
            console.log("6. Safe random");
            return [movePiece, moveTile];
        }
        // 7. Move to random location with random piece. 
        console.log("7. Random");
        moveTile = randVal(this.moveTiles);
        movePiece = randVal(moveTile[colors]);
        return [movePiece, moveTile];
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map