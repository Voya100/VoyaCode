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
var not_found_component_1 = require('./not-found.component');
var not_found_routing_1 = require('./not-found.routing');
var NotFoundModule = (function () {
    function NotFoundModule() {
    }
    NotFoundModule = __decorate([
        core_1.NgModule({
            imports: [not_found_routing_1.routing],
            exports: [],
            declarations: [not_found_component_1.NotFoundComponent],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], NotFoundModule);
    return NotFoundModule;
}());
exports.NotFoundModule = NotFoundModule;
//# sourceMappingURL=not-found.module.js.map