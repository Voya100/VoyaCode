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
var BlogsService = (function () {
    function BlogsService(http) {
        this.http = http;
        this.url = "http://voyacode.com/php/blogs.php";
    }
    // Gets blogs from server in the order of newest -> oldest.
    // Limit can be used to limit how many are fetched. Limit 0 gets all blogs.
    BlogsService.prototype.getBlogs = function (limit) {
        if (limit === void 0) { limit = 0; }
        return this.http.get(this.url + (limit ? '?limit=' + limit : '')).map(function (res) {
            console.log(res);
            console.log(res.json());
            return res.json().data || [{
                    id: 0,
                    name: "Blog search failed.",
                    text: "Sorry, something went wrong. If this problem persists, report to the admin through comments page."
                }];
        }).catch(function (err) {
            return [[{
                        id: 0,
                        name: "Blog search failed (error: " + err + ").",
                        text: "Sorry, something went wrong and blog couldn't be fetched from the server. Check your internet connection and refresh the page.<br><br>If problem persists, report to the admin through comments page."
                    }]];
        });
    };
    BlogsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BlogsService);
    return BlogsService;
}());
exports.BlogsService = BlogsService;
//# sourceMappingURL=blogs.service.js.map