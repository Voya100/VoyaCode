"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var piece_1 = require('./piece');
var Queen = (function (_super) {
    __extends(Queen, _super);
    function Queen(player, tile) {
        _super.call(this, player, tile);
        this.type = "queen";
        this.value = 7;
    }
    Queen.prototype.tileCheck = function () {
        this.clearTiles();
        this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 0, 8, true));
        this.moveTiles = this.moveTiles.concat(this.checkDirections(0, 1, 8, true));
        this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 1, 7, true));
        this.addTiles();
    };
    return Queen;
}(piece_1.Piece));
exports.Queen = Queen;
//# sourceMappingURL=queen.js.map