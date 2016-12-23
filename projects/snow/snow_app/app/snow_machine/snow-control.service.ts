import { Injectable } from '@angular/core';

import { SnowFlake } from './snow-flake'
import { SnowSettings } from './snow-settings'

@Injectable()
export class SnowControlService {

  flakes: SnowFlake[] = [];
  

  constructor(public settings: SnowSettings) { }

  // Creates flakes according to settings
  createFlakes(){
		for(let id=0; id < this.settings.count; id++){
			var flake = new SnowFlake(this.settings);
			this.flakes[id] = flake;
		}
	}

  // Deletes all flake elements from dom and array
  deleteFlakes(){
    let flake;
    while(flake = this.flakes.pop()){
      flake.destroy();
    }
  }
  
  // Moves all flakes by one step/frame
  moveRain(){
		for(let id=0; id < this.flakes.length; id++){
			this.flakes[id].move();
		}
		var self = this;
		setTimeout(function(){self.moveRain();}, 1000 / this.settings.fps);
	}



  // Resets snow rain, gives new settings
  reset(new_setting: SnowSettings){
    if(this.settings.reset){
      this.deleteFlakes();
    }
    this.settings = new_setting ? new_setting : this.settings;
    this.flakes = [];
    this.createFlakes();
  }

}