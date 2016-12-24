// Created by Voya (www.voyacode.com)
/* 
* This small program creates a nice snow effect on any page this script is put on.
* The parameters can be easily changed by editing settings object, which can result
* in different kinds of rain/snow (size, speed, colour, shape).
* Snow symbol can be replaced by any string or image, so you can use the program to rain
* absolutely anything (like cats, meteorites, pictures of snow flakes, etc.).
* 
* Each drop will get randomizes parameters (speed, wind and size), so the rain/snow
* has some variation. Variation can be removed by setting min/max parameters equal.
*
* You are free to use this code on your own website if you so wish, 
* but I would appreciate some credit. :)
*/


// Makes sure that code is run only once per page
if(typeof(rain_handler) == "undefined"){

// Rain handler handles creation and animation of the rain.
// Rain handler can take a settings object as a parameter - if it's not provided, it uses default values.
// Settings object must contain all settings listed below:

// settings.symbol: string, text content of the rain drop (examples: * for snow, ' for standard rain).

// settings.color: 	string, color in a format which can be accepted by CSS (color name, hex value...).

// settings.img: 		string, URL for image, defaults to null. This setting will override symbol and color.

// settings.size:		array containing two int values [minimum size, maximum size]. 
//									Tells in pixels how big font / image width can be.

// settings.count: 	int, how many drops there are on screen at once. The more there are, the more program stresses browser.

// settings.xSpeed: array containint two int values [minimum speed, maximum speed]. 
//									Determines how many pixels drop can move to left in 1 frame (= wind strength), both must be positive values.

// settings.ySpeed: array containing two int values [minimum speed, maximum_speed]. 
//									Determines how many pixels can move down in 1 frame, both must be positive values.

// settings.fps			int, maximum frames per second for the rain/snow. The real FPS is slightly smaller, because
//									this doesn't take into account the time needed to move drops between each frame.

// Note 1: All number values must be positive, negative values will cause problems.
// Note 2: Drops can only move down and to the left. They can't go to the right or up.
// Note 3: If count and fps are set too high, the browser can become slow and at worst crash.
//}

function Rain_handler(settings){

	// If settings aren't defined, default settings are used
	this.settings = typeof(settings) != "undefined" ? settings : {
		symbol: "*",
		img: null,
		color: "white",
		size: [20, 60], 		// font-size / img width [Minimum size, maximum size]
		count: 30,
		xSpeed: [0,1] , 	// wind speed [minimum speed, maximum speed]
		ySpeed: [2,10], 		//Fall speed [minimum speed, maximum speed]
		fps: 40
	};

	// These settings shouldn't be changed
	this.settings.xMax = document.documentElement.clientWidth-50;
	this.settings.yMax = Math.max( document.body.scrollHeight, 
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
		setTimeout(function(){self.moveRain();}, 1000 / this.settings.fps);
	}

}

// Holds information and actions of a single rain drop / snow flakes
// Takes settings object as a parameter
function Drop(s){
	// Drop speed and wind are randomized with initialisation
	this.xSp = s.xSpeed[0] + Math.random()*(s.xSpeed[1] - s.xSpeed[0]);
	this.ySp = s.ySpeed[0] + Math.random()*(s.ySpeed[1] - s.ySpeed[0]);

	// Start positions are randomized
	this.x = Math.random()*s.xMax;
	this.y = -10-Math.random()*100;

	// Size is randomized
	this.size = s.size[0] + Math.random()*(s.size[1] - s.size[0]);
	this.e = null;

	// Creates a drop element, is done right after initialisation
	this.createDrop = function(){
		this.e = document.createElement('div');
		this.e.setAttribute("style", 'position: fixed; width: 3px;z-index:50; font-size: ' + this.size + 'px; color: ' + s.color);
		if(s.img != null){
			var img = new Image();
			img.setAttribute('src', s.img);
			if(this.size){
				img.style.width = this.size + "px";
			}
			this.e.appendChild(img);
		}else{
			this.e.appendChild(document.createTextNode(s.symbol));
		}
		this.e = document.body.appendChild(this.e);
	}

	// Moves drop by one step/frame
	this.move = function(){
		this.x -= this.xSp;
		this.y += this.ySp;
		// If drop moves over left/bottom side of the window, move it back up and randomize x position
		if(this.x < -50 || this.y > s.yMax){
			this.y = -40;
			this.x = Math.random()*s.xMax;
		}
		this.e.style.left = this.x + "px";
		this.e.style.top = this.y + "px";
	}
}

// Activate rain once page has loaded.
window.onload=function(){
	var rain_handler = new Rain_handler();
	rain_handler.createDrops();
	rain_handler.moveRain();
}
}