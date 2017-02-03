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
var projects_1 = require('../../shared/data/projects');
// Banner component goes shows all project banners one at a time.
// Banner changes project automatically every 5 seconds.
// User can alternatively select which banner is shown.
var BannerComponent = (function () {
    function BannerComponent() {
        this.id = 0;
        this.auto = false;
        this.projects = projects_1.projectList.filter(function (o) { return o.onBanner; });
        this.len = this.projects.length;
    }
    BannerComponent.prototype.ngOnInit = function () {
        this.autoChange(6000);
    };
    // Changes banner automatically, if it hasn't been changed manually since last auto change
    BannerComponent.prototype.autoChange = function (time) {
        var _this = this;
        if (this.auto) {
            this.change(this.id + 1);
        }
        else {
            this.auto = true;
        }
        setTimeout(function () {
            _this.autoChange(5000);
        }, time);
    };
    // Changes active project to id.
    // Negative id values are changed to last element.
    // Modulo is used when id value is too high.
    // Manual changes prevent 1 automatic change.
    BannerComponent.prototype.change = function (id, manual) {
        if (manual === void 0) { manual = false; }
        if (manual) {
            this.auto = false;
        }
        this.id = id < 0 ? this.len - 1 : id % this.len;
    };
    BannerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'banner',
            templateUrl: 'banner.component.html',
            styleUrls: ['./banner.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
//# sourceMappingURL=banner.component.js.map