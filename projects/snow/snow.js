// Created by Voya (www.voyacode.com)
/* This small program creates a nice snow effect on any page this script is put on.
*  ...
*
*
*
*/


// Makes sure that code is run only once
if(typeof(rain_handler) == "undefined"){


function Rain_handler(settings){

	// If settings aren't defined, default settings are used
	this.settings = typeof(settings) != "undefined" ? settings : {
		symbol: " * ",
		color: "white",
		count: 15,
		xSpeed: [-0.60,0.14] , 	//wind, [minimum speed, variation]
		ySpeed: [1.5,8], 		//Fall speed [minimum speed, variation]
		font: [20, 30], 		//[Minimum font size, font variation]
		xMax: document.documentElement.clientWidth-50,
		yMax: Math.max( document.body.scrollHeight, 
						document.body.offsetHeight, 
						document.documentElement.clientHeight, 
						document.documentElement.scrollHeight, 
						document.documentElement.offsetHeight )
	}
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
		setTimeout(function(){self.moveRain();}, 25);
	}

}

function Drop(s){
	// Drop speed (and direction) is randomized with initialisation
	this.xSp = s.xSpeed[0] + Math.random()*s.xSpeed[1];
	this.ySp = s.ySpeed[0] + Math.random()*s.ySpeed[1];
	console.log(s);
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


window.onload=function(){
	var rain_handler = new Rain_handler();
	rain_handler.createDrops();

	rain_handler.moveRain();
}
}