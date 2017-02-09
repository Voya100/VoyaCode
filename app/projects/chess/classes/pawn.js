"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var piece_1 = require('./piece');
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(player, tile) {
        _super.call(this, player, tile);
        this.type = "pawn";
        this.value = 1;
        this.xStart = tile.x;
        this.yStart = tile.y;
    }
    Pawn.prototype.tileCheck = function () {
        this.clearTiles();
        var x = this.tile.x;
        var y = this.tile.y;
        var dir = this.white ? 1 : -1;
        var tile = this.tiles[x + dir][y];
        if (tile.empty()) {
            this.moveTiles.push(tile);
        }
        if (0 <= x + 2 * dir && x + 2 * dir < 8 && this.xStart == x && tile.empty()) {
            tile = this.tiles[x + 2 * dir][y];
            if (tile.empty()) {
                this.moveTiles.push(tile);
            }
        }
        if (y + 1 < 8) {
            tile = this.tiles[x + dir][y + 1];
            if (!tile.isFriend(this) && !tile.empty()) {
                this.moveTiles.push(tile);
            }
            this.hitTiles.push(tile);
            tile.addHitter(this);
        }
        if (y - 1 >= 0) {
            tile = this.tiles[x + dir][y - 1];
            if (!tile.isFriend(this) && !tile.empty()) {
                this.moveTiles.push(tile);
            }
            this.hitTiles.push(tile);
            tile.addHitter(this);
        }
        this.addTiles();
    };
    return Pawn;
}(piece_1.Piece));
exports.Pawn = Pawn;
//# sourceMappingURL=pawn.js.map