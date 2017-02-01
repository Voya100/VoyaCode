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
        this.postUrl = "http://voyacode.com/php/postComment.php";
    }
    // Gets comments from the server
    CommentsService.prototype.getComments = function () {
        return this.http.get(this.url).map(function (res) {
            return res.json().data;
        }).catch(function (err) {
            return null;
        });
    };
    // Posts a comment to server - comment validation is handled by server, and it can be rejected.
    // Returns observable with object {error: errorString, data: commentData}
    // errorString is an empty string, if no errors are found and comment post is successful.
    CommentsService.prototype.postComment = function (username, message, privateM, preview) {
        if (preview === void 0) { preview = false; }
        var data = new http_1.URLSearchParams();
        data.append('username', username);
        data.append('message', message);
        data.append('private', privateM ? '1' : '0');
        if (preview) {
            data.append('preview', '1');
        }
        return this.http.post(this.postUrl, data).map(function (res) {
            return res.json();
        });
    };
    CommentsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommentsService);
    return CommentsService;
}());
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map