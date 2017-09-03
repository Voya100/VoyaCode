import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { BlogsComponent } from './blogs.component';
import { BlogFilterPipe } from './blog-filter.pipe';

import { routing } from './blogs.routing';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  imports: [CommonModule, SharedModule, routing],
  exports: [],
  declarations: [BlogsComponent, BlogComponent, BlogFilterPipe],
  providers: []
})
export class BlogsModule { }
