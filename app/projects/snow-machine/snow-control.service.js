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
var snow_settings_1 = require('./snow-settings/snow-settings');
// SnowControlService controls snow/rain effect.
// It creates, deletes and moves flakes.
var SnowControlService = (function () {
    function SnowControlService(settings) {
        this.settings = settings;
        this.flakes = [];
        // Stores flakes that are kept on the screen (don't move anymore) so that they can be easily deleted later
        this.oldFlakes = [];
    }
    // Creates flakes according to settings
    SnowControlService.prototype.createFlakes = function () {
        for (var id = 0; id < this.settings.count; id++) {
            this.flakes.push(new snow_flake_1.SnowFlake(this.settings));
        }
    };
    // Deletes all current and old flakes
    SnowControlService.prototype.deleteFlakes = function () {
        var flake;
        while (flake = this.flakes.pop()) {
            flake.destroy();
        }
        while (flake = this.oldFlakes.pop()) {
            flake.destroy();
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
    // Resets snow/rain, activates new settings
    SnowControlService.prototype.reset = function (new_setting) {
        this.settings = new_setting ? new_setting : this.settings;
        if (this.settings.reset) {
            this.deleteFlakes();
        }
        else {
            this.oldFlakes = this.oldFlakes.concat(this.flakes);
            this.flakes = [];
        }
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