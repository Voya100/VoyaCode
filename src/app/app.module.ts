import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AuthModule } from './authentication/auth.module';
import { HomeModule } from './home/home.module';
import { ScrollbarModule } from './shared/components/scrollbar/scrollbar.module';
import { MainFooterComponent } from './shared/main-footer/main-footer.component';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';

import { routing } from './app.routing';

@NgModule({
  imports: [
    AuthModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MaterialModule,
    ScrollbarModule,
    SharedModule,
    HomeModule,
    ServiceWorkerModule.register('/sw-master.js', { enabled: environment.production })
  ],
  // Force spinner animations on pre-rendered app shell
  providers: [{ provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, useValue: { diameter: 100, _forceAnimations: true } }],
  declarations: [AppComponent, MainHeaderComponent, MainFooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
