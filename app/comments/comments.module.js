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
var comments_component_1 = require('./comments.component');
var comments_routing_1 = require('./comments.routing');
var CommentsModule = (function () {
    function CommentsModule() {
    }
    CommentsModule = __decorate([
        core_1.NgModule({
            imports: [comments_routing_1.routing],
            exports: [],
            declarations: [comments_component_1.CommentsComponent],
            providers: [],
        }), 
        __metadata('design:paramtypes', [])
    ], CommentsModule);
    return CommentsModule;
}());
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map