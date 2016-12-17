// Created by Voya (www.voyacode.com)


if(typeof(drops) == "undefined"){
//Settings

var symbol = " * ";
var color = "white";
var count = 15;
var xSpeed = [-0.60,0.14] //wind, [minimum speed, speed variation]
var ySpeed = [1.5,8] //Fall speed [minimum speed, speed variation]
var font = [20, 30] //[Minimum font size, font variation]
var xMax = document.documentElement.clientWidth-50;
var yMax = Math.max( document.body.scrollHeight, 
                     document.body.offsetHeight, 
                     document.documentElement.clientHeight, 
                     document.documentElement.scrollHeight, 
                     document.documentElement.offsetHeight );



function Drop(id){
	this.id = id;
	this.xSp = xSpeed[0] + Math.random()*xSpeed[1];
	this.ySp = ySpeed[0] + Math.random()*ySpeed[1];
	this.x = Math.random()*xMax;
	this.y = -10-Math.random()*100;
	this.fontSize = font[0] + Math.random()*font[1];
	this.e = document.createElement('div');
	this.e.id = "drop" + id;
	this.e.setAttribute("style", 'position: fixed; width: 3px;z-index:50; font-size: ' + this.fontSize + 'px; color: ' + color);
	this.e.appendChild(document.createTextNode(symbol));
	document.body.appendChild(this.e);
	this.e = document.getElementById("drop" + id);
	this.move = function(){
		this.x += this.xSp;
		this.y += this.ySp;
		if(this.x < -50){
			this.x = Math.random()*xMax;
			this.y = -40;
		}
		if(this.y > yMax){
			this.y = -40;
			this.x = Math.random()*xMax;
		}
		this.e.style.left = this.x + "px";
		this.e.style.top = this.y + "px" // document.body.scrollTop + "px";
	}
}

function moveRain(){	
	for(id=0; id < count; id++){
		drops[id].move();
	}setTimeout('moveRain()','25')
}

//Setup

var drops = [];

window.onload=function(){
for(id=0; id < count; id++){
	var drop = new Drop(id);
	drops[id] = drop;
}
window.onload=moveRain();
}
}