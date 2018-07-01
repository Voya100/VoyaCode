import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthModule } from './authentication/auth.module';
import { HomeModule } from './home/home.module';
import { ScrollbarModule } from './shared/components/scrollbar/scrollbar.module';
import { MainFooterComponent } from './shared/main-footer/main-footer.component';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MaterialModule,
    ScrollbarModule,
    SharedModule,
    HomeModule,
    routing,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent, MainHeaderComponent, MainFooterComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
