import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AuthModule } from './authentication/auth.module';
import { HomeModule } from './home/home.module';
import { ScrollbarModule } from './shared/components/scrollbar/scrollbar.module';
import { MainFooterComponent } from './shared/main-footer/main-footer.component';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { SharedModule } from './shared/shared.module';

import { routing } from './app.routing';

@NgModule({
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ScrollbarModule,
    SharedModule,
    HomeModule,
    routing
  ],
  declarations: [AppComponent, MainHeaderComponent, MainFooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
