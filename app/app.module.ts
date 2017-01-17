import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'

import { AppComponent }  from './app.component';

import { MainFooterComponent } from './shared/main-footer/main-footer.component'
import { MainHeaderComponent} from './shared/main-header/main-header.component'

import { routing } from './app.routing';
 
@NgModule({
  imports:      [ BrowserModule, HttpModule, routing ],
  declarations: [ AppComponent, MainHeaderComponent, MainFooterComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
