import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home.component';

import { routing } from './home.routing';

@NgModule({
  imports: [CommonModule, SharedModule, routing],
  exports: [],
  declarations: [HomeComponent, BannerComponent],
  providers: []
})
export class HomeModule {}
