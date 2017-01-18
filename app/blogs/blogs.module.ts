import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module'

import { BlogsComponent } from './blogs.component'
import { BlogFilterPipe } from './blog-filter.pipe'

import { routing } from './blogs.routing';

@NgModule({
  imports: [CommonModule, SharedModule, routing],
  exports: [],
  declarations: [BlogsComponent, BlogFilterPipe],
  providers: [],
})
export class BlogsModule { }
