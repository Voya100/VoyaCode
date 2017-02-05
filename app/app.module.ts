import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { MdProgressCircleModule } from '@angular/material';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';
 
const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 2.5
};
import { AppComponent }  from './app.component';

import { MainFooterComponent } from './shared/main-footer/main-footer.component'
import { MainHeaderComponent} from './shared/main-header/main-header.component'

import { routing } from './app.routing';
 
@NgModule({
  imports:      [ BrowserModule, HttpModule, MdProgressCircleModule, PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG), routing ],
  declarations: [ AppComponent, MainHeaderComponent, MainFooterComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
