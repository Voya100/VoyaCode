import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { MainHeaderComponent} from './shared/main-header/main-header.component'
import { routing } from './app.routing';
 
@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [ AppComponent, MainHeaderComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
