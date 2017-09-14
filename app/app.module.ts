import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MdProgressSpinnerModule } from '@angular/material';
 
import { AppComponent } from './app.component';

import { MainFooterComponent } from './shared/main-footer/main-footer.component';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { ScrollbarModule } from './shared/components/scrollbar/scrollbar.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './authentication/auth.module';

import { routing } from './app.routing';
 
@NgModule({
  imports: [ 
    AuthModule, BrowserModule, BrowserAnimationsModule, HttpModule, MdProgressSpinnerModule, 
    ScrollbarModule, SharedModule, HomeModule, routing 
  ],
  declarations: [ AppComponent, MainHeaderComponent, MainFooterComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
