"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var piece_1 = require('./piece');
var King = (function (_super) {
    __extends(King, _super);
    function King(player, tile) {
        _super.call(this, player, tile);
        this.type = "king";
        this.value = 10;
    }
    King.prototype.tileCheck = function () {
        this.clearTiles();
        this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 0, 1, true));
        this.moveTiles = this.moveTiles.concat(this.checkDirections(0, 1, 1, true));
        this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 1, 1, true));
        this.addTiles();
    };
    return King;
}(piece_1.Piece));
exports.King = King;
//# sourceMappingURL=king.js.map