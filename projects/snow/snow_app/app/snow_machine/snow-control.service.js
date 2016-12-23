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
var snow_flake_1 = require('./snow-flake');
var snow_settings_1 = require('./snow-settings');
var SnowControlService = (function () {
    function SnowControlService(settings) {
        this.settings = settings;
        this.flakes = [];
    }
    // Creates flakes according to settings
    SnowControlService.prototype.createFlakes = function () {
        for (var id = 0; id < this.settings.count; id++) {
            var flake = new snow_flake_1.SnowFlake(this.settings);
            this.flakes[id] = flake;
        }
    };
    // Moves all flakes by one step/frame
    SnowControlService.prototype.moveRain = function () {
        for (var id = 0; id < this.flakes.length; id++) {
            this.flakes[id].move();
        }
        var self = this;
        setTimeout(function () { self.moveRain(); }, 1000 / this.settings.fps);
    };
    // Resets snow rain, gives new settings
    SnowControlService.prototype.reset = function (new_setting) {
        this.settings = new_setting ? new_setting : this.settings;
        this.flakes = [];
        this.createFlakes();
    };
    SnowControlService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [snow_settings_1.SnowSettings])
    ], SnowControlService);
    return SnowControlService;
}());
exports.SnowControlService = SnowControlService;
//# sourceMappingURL=snow-control.service.js.map