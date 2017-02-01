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
var snow_settings_1 = require('../snow-settings/snow-settings');
var FormRowComponent = (function () {
    function FormRowComponent() {
        var _this = this;
        this.min = function () { return _this.settings.min_values[_this.id](); };
        this.max = function () { return _this.settings.max_values[_this.id](); };
    }
    FormRowComponent.prototype.valid = function () {
        return this.min() <= this.settings[this.id] &&
            this.settings[this.id] <= this.max();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', snow_settings_1.SnowSettings)
    ], FormRowComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormRowComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormRowComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormRowComponent.prototype, "description", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], FormRowComponent.prototype, "step", void 0);
    FormRowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'form-row',
            templateUrl: 'form-row.component.html',
            styleUrls: ['form-row.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], FormRowComponent);
    return FormRowComponent;
}());
exports.FormRowComponent = FormRowComponent;
//# sourceMappingURL=form-row.component.js.map