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
var form_row_component_1 = require('./form-row.component');
var snow_control_service_1 = require('./snow-control.service');
var snow_settings_1 = require('./snow-settings');
var SnowSettingsComponent = (function () {
    function SnowSettingsComponent(snow_controller) {
        this.snow_controller = snow_controller;
        this.settings = this.snow_controller.settings;
    }
    SnowSettingsComponent.prototype.ngOnInit = function () {
        this.snow_controller.createFlakes();
        this.snow_controller.moveRain();
    };
    SnowSettingsComponent.prototype.ngAfterViewInit = function () {
        this.formRows = this.formRowsQuery.toArray();
    };
    // Reset snow and apply new settings, if all new settings are valid.
    SnowSettingsComponent.prototype.reset = function () {
        if (this.formRows.every(function (row) { return row.valid(); })) {
            this.snow_controller.reset(this.settings);
        }
    };
    __decorate([
        core_1.ViewChildren(form_row_component_1.FormRowComponent), 
        __metadata('design:type', core_1.QueryList)
    ], SnowSettingsComponent.prototype, "formRowsQuery", void 0);
    SnowSettingsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'snow-settings',
            templateUrl: './snow-settings.component.html',
            providers: [snow_control_service_1.SnowControlService, snow_settings_1.SnowSettings]
        }), 
        __metadata('design:paramtypes', [snow_control_service_1.SnowControlService])
    ], SnowSettingsComponent);
    return SnowSettingsComponent;
}());
exports.SnowSettingsComponent = SnowSettingsComponent;
//# sourceMappingURL=snow-settings.component.js.map