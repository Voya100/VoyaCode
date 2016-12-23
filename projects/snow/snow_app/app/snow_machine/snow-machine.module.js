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
var description_box_component_1 = require('../shared/description-box.component');
var snow_machine_component_1 = require('./snow-machine.component');
var snow_settings_component_1 = require('./snow-settings.component');
var SnowMachineModule = (function () {
    function SnowMachineModule() {
    }
    SnowMachineModule = __decorate([
        core_1.NgModule({
            imports: [],
            declarations: [description_box_component_1.DescriptionBoxComponent, snow_machine_component_1.SnowMachineComponent, snow_settings_component_1.SnowSettingsComponent],
            exports: [description_box_component_1.DescriptionBoxComponent, snow_machine_component_1.SnowMachineComponent, snow_settings_component_1.SnowSettingsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SnowMachineModule);
    return SnowMachineModule;
}());
exports.SnowMachineModule = SnowMachineModule;
//# sourceMappingURL=snow-machine.module.js.map