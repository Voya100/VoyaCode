// Created by Voya (www.voyacode.com)
/* 
* This small program creates a nice snow effect on any page this script is put on.
* The parameters can be easily changed by editing settings object, which can result
* in different kinds of rain/snow (size, speed, colour, shape).
* 
* Each drop will get randomizes parameters (speed, wind and size), so the rain/snow
* has some variation. Variation can be removed by setting all "variation" settings to 0.
*
*
*/


// Makes sure that code is run only once
if(typeof(rain_handler) == "undefined"){

// Rain handler handles creation and animation of the rain.
// Rain handler can take a settings object as a parameter - if it's not provided, it uses default values.
// Settings object must contain all settings listed below:

// settings.symbol: 	string, text content of the rain drop (examples: * for snow, ' for standard rain).

// settings.color: 		string, color in a format which can be accepted by CSS (color name, hex value...).

// settings.font:		array containing two int values [minimum font size, variation]. Tells in pixels how big font can be.

// settings.count: 		int, how many drops there are on screen at once. The more there are, the more program stresses browser.
//						Browser can crash, if this amount is too much.

// settings.xSpeed: 	array containint two int values [minimum speed, variation]. 
//						Determines how many pixels drop can move to left in 1 frame (= wind strength), both must be positive values.

// settings.ySpeed: 	array containing two int values [minimum speed, variation]. 
//						Determines how many pixels can move down in 1 frame, both must be positive values.

// settings.interval	int, time between "frames" in milliseconds. The smaller it is, the faster  rain will go, but will also
//						be heavier for the browser. May cause browser to crash if set too low, especially if count is set high.
//						Note that this doesn't represent interval accurately, because it doesn't take into account time needed
//						to move all the drops. The real interval will be slightly longer.

// Note 1: All number values must be positive, negative values will cause problems.
// Note 2: Variation means how much higher the maximum value is compared to minimum. If variation is set to 0, all values will be the same.
// Note 3: Drops can only move down and to the left. They can't go to the right or up.
//}

function Rain_handler(settings){

	// If settings aren't defined, default settings are used
	this.settings = typeof(settings) != "undefined" ? settings : {
		symbol: " * ",
		color: "white",
		font: [20, 40], 		//[Minimum font size, font variation]
		count: 30,
		xSpeed: [-0.60,0.14] , 	//wind, [minimum speed, variation]
		ySpeed: [1.5,8], 		//Fall speed [minimum speed, variation]
		interval: 25
	};

	// These settings shouldn't be changed
	this.settings.yMax = document.documentElement.clientWidth-50;
	this.settings.xMax = Math.max( document.body.scrollHeight, 
						document.body.offsetHeight, 
						document.documentElement.clientHeight, 
						document.documentElement.scrollHeight, 
						document.documentElement.offsetHeight );

	this.drops = [];

	// Creates drop elements
	this.createDrops = function(){
		for(var id=0; id < this.settings.count; id++){
			var drop = new Drop(this.settings);
			drop.createDrop();
			this.drops[id] = drop;
		}
	}

	// Moves all drops by one frame
	this.moveRain = function(){
		for(var id=0; id < this.settings.count; id++){
			this.drops[id].move();
		}
		var self = this;
		setTimeout(function(){self.moveRain();}, this.settings.interval);
	}

}

function Drop(s){
	// Drop speed and wind are randomized with initialisation
	this.xSp = s.xSpeed[0] + Math.random()*s.xSpeed[1];
	this.ySp = s.ySpeed[0] + Math.random()*s.ySpeed[1];

	// Start positions are randomized
	this.x = Math.random()*s.xMax;
	this.y = -10-Math.random()*100;

	// Font size is randomized
	this.fontSize = s.font[0] + Math.random()*s.font[1];
	this.e = null;

	// Creates a drop element, is done right after initialisation
	this.createDrop = function(){
		this.e = document.createElement('div');
		this.e.setAttribute("style", 'position: fixed; width: 3px;z-index:50; font-size: ' + this.fontSize + 'px; color: ' + s.color);
		this.e.appendChild(document.createTextNode(s.symbol));
		this.e = document.body.appendChild(this.e);
	}

	// Moves drop by one step/frame
	this.move = function(){
		this.x += this.xSp;
		this.y += this.ySp;
		// If drop moves over left/bottom side of the window, move it back up and randomize x position
		if(this.x < -50 || this.y > s.yMax){
			this.y = -40;
			this.x = Math.random()*s.xMax;
		}
		this.e.style.left = this.x + "px";
		this.e.style.top = this.y + "px" // document.body.scrollTop + "px";
	}
}

// Activate rain once page has loaded.
window.onload=function(){
	var rain_handler = new Rain_handler();
	rain_handler.createDrops();
	rain_handler.moveRain();
}
}