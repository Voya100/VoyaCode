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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var CommentsService = (function () {
    function CommentsService(http) {
        this.http = http;
        this.url = "http://voyacode.com/php/getComments.php";
    }
    // 
    CommentsService.prototype.getComments = function () {
        return this.http.get(this.url).map(function (res) {
            return res.json().data;
        }).catch(function (err) {
            return null;
        });
        /*
        return [{
          username: 'Voya',
          content: "I have now got the comments page ready. You can give here feedback regarding projects or the website itself, or just comment whatever you like (as long as it isn't spam). <br><br>At the moment commenting don't require registration, but I may do a system for it at a later date. ",
          publishTime: '17.01.2016 19:36',
          editTime: '05.08.2016 22:46',
          admin: true,
          private: false
        }];
        */
    };
    CommentsService.prototype.postComment = function () {
        return null;
    };
    CommentsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommentsService);
    return CommentsService;
}());
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map