import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component'

import { routing } from './home.routing';

@NgModule({
  imports: [CommonModule, SharedModule, routing],
  exports: [],
  declarations: [HomeComponent, BannerComponent],
  providers: []
})
export class HomeModule { }
