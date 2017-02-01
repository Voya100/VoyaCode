import { Injectable } from '@angular/core';

import { SnowFlake } from './snow-flake'
import { SnowSettings } from './snow-settings/snow-settings'

// SnowControlService controls snow/rain effect.
// It creates, deletes and moves flakes.

@Injectable()
export class SnowControlService {

  flakes: SnowFlake[] = [];
  // Stores flakes that are kept on the screen (don't move anymore) so that they can be easily deleted later
  oldFlakes: SnowFlake[] = [];

  constructor(public settings: SnowSettings) { }

  // Creates flakes according to settings
  createFlakes(){
		for(let id=0; id < this.settings.count; id++){
      this.flakes.push(new SnowFlake(this.settings));
		}
	}

  // Deletes all current and old flakes
  deleteFlakes(){
    let flake: SnowFlake;
    while(flake = this.flakes.pop()){
      flake.destroy();
    }
    while(flake = this.oldFlakes.pop()){
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

  // Resets snow/rain, activates new settings
  reset(new_setting: SnowSettings){
    this.settings = new_setting ? new_setting : this.settings;

    if(this.settings.reset){
      this.deleteFlakes();
    }else{
      this.oldFlakes = this.oldFlakes.concat(this.flakes);
      this.flakes = [];
    }
    this.createFlakes();
  }

}