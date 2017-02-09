"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var piece_1 = require('./piece');
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(player, tile) {
        _super.call(this, player, tile);
        this.type = "knight";
        this.value = 4;
    }
    Knight.prototype.tileCheck = function () {
        this.clearTiles();
        this.moveTiles = this.moveTiles.concat(this.checkDirections(2, 1, 1, true));
        this.moveTiles = this.moveTiles.concat(this.checkDirections(1, 2, 1, true));
        this.addTiles();
    };
    return Knight;
}(piece_1.Piece));
exports.Knight = Knight;
//# sourceMappingURL=knight.js.map