"use strict";
var SnowSettings = (function () {
    function SnowSettings() {
        this.symbol = " * ";
        this.colour = "white";
        this.count = 30;
        this.min_speed = 1.5;
        this.max_speed = 10;
        this.min_wind = 0.45;
        this.max_wind = 0.6;
        this.font_min = 20;
        this.font_max = 60;
        this.fps = 40;
        this.xMax = document.documentElement.clientWidth - 50;
        this.yMax = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    }
    return SnowSettings;
}());
exports.SnowSettings = SnowSettings;
//# sourceMappingURL=snow-settings.js.map