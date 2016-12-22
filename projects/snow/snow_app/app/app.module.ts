import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { SnowMachineModule } from './snow_machine/snow-machine.module'

@NgModule({
  imports:      [ BrowserModule, SnowMachineModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
