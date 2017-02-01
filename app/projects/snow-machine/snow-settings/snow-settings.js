// This class contains all settings for snow/rain and their minimum and maximum values.
// All settings are initialised to their default values.
"use strict";
// Settings:
// Symbol:  Text representation of the flake/rain drop. Can be multiple characters.
// Color:   Color name, hex value or some other color format supported by CSS.
// Img:     Optional setting that takes an URL of an image - will override symbol and color if used.
// Count:   How many flakes there are on screen at once.
// Speed:   Speed to y direction (downwards, px / frame).
// Wind:    Speed to -x direction (px / frame).
// Size:    Either font-size or image width in pixels. If img != "" and size == 0, image's default size will be used.
// FPS:     Maximum theoretical Frames per second. Reaal FPS is slightly lower. Can be changed without reset.
// Reset:   If true, all old flakes/rain drops are removed when new settings are applied. 
//          If false, old ones are kept on the screen, but they won't move
var SnowSettings = (function () {
    function SnowSettings() {
        var _this = this;
        this.symbol = "*";
        this.color = "white";
        this.img = "";
        this.count = 30;
        this.min_speed = 2;
        this.max_speed = 10;
        this.min_wind = 0;
        this.max_wind = 1;
        this.min_size = 20;
        this.max_size = 60;
        this.fps = 40;
        this.reset = true;
        // Edges of the screen
        this.xMax = document.documentElement.clientWidth - 50;
        this.yMax = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        // Max/min values can depend on current settings.
        // Min value can't be higher than current max setting value and max value can't be smaller than min value.
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