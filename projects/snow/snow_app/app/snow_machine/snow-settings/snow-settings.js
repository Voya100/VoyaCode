"use strict";
var SnowSettings = (function () {
    function SnowSettings() {
        var _this = this;
        this.symbol = " * ";
        this.img = "";
        this.color = "white";
        this.count = 30;
        this.min_speed = 2;
        this.max_speed = 10;
        this.min_wind = 0;
        this.max_wind = 1;
        this.min_size = 20;
        this.max_size = 60;
        this.fps = 40;
        this.reset = true;
        this.xMax = document.documentElement.clientWidth - 50;
        this.yMax = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        this.max_values = {
            count: function () { return 1000; },
            min_speed: function () { return _this.max_speed; },
            max_speed: function () { return 1000; },
            min_wind: function () { return _this.max_wind; },
            max_wind: function () { return 1000; },
            min_size: function () { return _this.max_size; },
            max_size: function () { return 1000; },
            fps: function () { return 100; }
        };
        this.min_values = {
            count: function () { return 1; },
            min_speed: function () { return 0; },
            max_speed: function () { return _this.min_speed; },
            min_wind: function () { return 0; },
            max_wind: function () { return _this.min_wind; },
            min_size: function () { return 0; },
            max_size: function () { return _this.min_size; },
            fps: function () { return 1; }
        };
    }
    return SnowSettings;
}());
exports.SnowSettings = SnowSettings;
//# sourceMappingURL=snow-settings.js.map