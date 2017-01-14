"use strict";
// SnowFlake contains all information of a specific SnowFlake.
// SnowFlake's values are randomized according to settings at initialisation.
// Note: This class could also have been implemented as a component, but I chose to stick
// with the original method (similar to snow.js). I believe this to be slightly more effective that it would be with Angular component.
var SnowFlake = (function () {
    function SnowFlake(s) {
        this.s = s;
        // Drop speed and wind are randomized with initialisation
        this.xSp = s.min_wind + (Math.random() * (s.max_wind - s.min_wind));
        this.ySp = s.min_speed + (Math.random() * (s.max_speed - s.min_speed));
        // Start positions are randomized
        this.x = Math.random() * s.xMax;
        this.y = -10 - Math.random() * 100;
        // Font/image size is randomized
        this.size = s.min_size + Math.random() * (s.max_size - s.min_size);
        this.settings = s;
        this.createFlake();
    }
    // Creates a flake element, is done with initialisation
    SnowFlake.prototype.createFlake = function () {
        this.e = document.createElement('div');
        this.e.setAttribute("style", 'position: fixed; pointer-events:none; width: 3px;z-index:50; font-size: ' + this.size + 'px; color: ' + this.settings.color);
        this.e.setAttribute("class", "flake");
        if (this.settings.img) {
            var img = new Image();
            img.setAttribute('src', this.settings.img);
            if (this.size) {
                img.style.width = this.size + "px";
            }
            this.e.appendChild(img);
        }
        else {
            this.e.appendChild(document.createTextNode(this.settings.symbol));
        }
        this.e = document.body.appendChild(this.e);
    };
    // Destroys flake element
    SnowFlake.prototype.destroy = function () {
        this.e.remove();
    };
    // Moves flake by one step/frame
    SnowFlake.prototype.move = function () {
        this.x -= this.xSp;
        this.y += this.ySp;
        // If drop moves over left/bottom side of the window, move it back up and randomize x position
        if (this.x < -50 || this.y > this.settings.yMax) {
            this.y = -40;
            this.x = Math.random() * this.settings.xMax;
        }
        this.e.style.left = this.x + "px";
        this.e.style.top = this.y + "px";
    };
    return SnowFlake;
}());
exports.SnowFlake = SnowFlake;
//# sourceMappingURL=snow-flake.js.map