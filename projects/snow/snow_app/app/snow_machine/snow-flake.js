"use strict";
var SnowFlake = (function () {
    function SnowFlake(s) {
        this.s = s;
        // Creates a flake element, is done right after initialisation
        this.createFlake = function () {
            this.e = document.createElement('div');
            this.e.setAttribute("style", 'position: fixed; width: 3px;z-index:50; font-size: ' + this.fontSize + 'px; color: ' + this.settings.color);
            this.e.appendChild(document.createTextNode(this.settings.symbol));
            this.e = document.body.appendChild(this.e);
        };
        // Moves flake by one step/frame
        this.move = function () {
            this.x -= this.xSp;
            this.y += this.ySp;
            // If drop moves over left/bottom side of the window, move it back up and randomize x position
            if (this.x < -50 || this.y > this.settings.yMax) {
                this.y = -40;
                this.x = Math.random() * this.settings.xMax;
            }
            this.e.style.left = this.x + "px";
            this.e.style.top = this.y + "px"; // document.body.scrollTop + "px";
        };
        // Drop speed and wind are randomized with initialisation
        this.xSp = s.min_wind + (Math.random() * (s.max_wind - s.min_wind));
        this.ySp = s.min_speed + (Math.random() * (s.max_speed - s.min_speed));
        // Start positions are randomized
        this.x = Math.random() * s.xMax;
        this.y = -10 - Math.random() * 100;
        // Font size is randomized
        this.fontSize = s.min_font + Math.random() * (s.max_font - s.min_font);
        this.settings = s;
        this.createFlake();
    }
    return SnowFlake;
}());
exports.SnowFlake = SnowFlake;
//# sourceMappingURL=snow-flake.js.map