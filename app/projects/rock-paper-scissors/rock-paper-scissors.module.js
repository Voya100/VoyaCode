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
var rock_paper_scissors_component_1 = require('./rock-paper-scissors.component');
var rock_paper_scissors_routing_1 = require('./rock-paper-scissors.routing');
// NOTE: This is a very old project of mine (first one I ever made), so the code is very badly outdated, and in Finnish.
// The project is made with ordinary Javascript. I plan to rewrite the code in near future, but as a temporary solution
// I'm including it in angular version of the page with iframe
var RockPaperScissorsModule = (function () {
    function RockPaperScissorsModule() {
    }
    RockPaperScissorsModule = __decorate([
        core_1.NgModule({
            imports: [rock_paper_scissors_routing_1.routing, shared_module_1.SharedModule],
            exports: [],
            declarations: [rock_paper_scissors_component_1.RockPaperScissorsComponent],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], RockPaperScissorsModule);
    return RockPaperScissorsModule;
}());
exports.RockPaperScissorsModule = RockPaperScissorsModule;
//# sourceMappingURL=rock-paper-scissors.module.js.map