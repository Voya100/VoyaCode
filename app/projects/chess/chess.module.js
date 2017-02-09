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
var shared_module_1 = require('../../shared/shared.module');
var chess_component_1 = require('./chess.component');
var chess_game_component_1 = require('./chess-game/chess-game.component');
var chess_routing_1 = require('./chess.routing');
var ChessModule = (function () {
    function ChessModule() {
    }
    ChessModule = __decorate([
        core_1.NgModule({
            imports: [chess_routing_1.routing, shared_module_1.SharedModule],
            exports: [],
            declarations: [chess_component_1.ChessComponent, chess_game_component_1.ChessGameComponent],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], ChessModule);
    return ChessModule;
}());
exports.ChessModule = ChessModule;
//# sourceMappingURL=chess.module.js.map