import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent }   from './home.component';
import { BannerComponent } from './banner/banner.component'

import { BlogPostComponent } from '../blogs/blog-post/blog-post.component'
import { BlogsService } from '../blogs/blogs.service'

import { routing } from './home.routing';

@NgModule({
  imports: [CommonModule, routing],
  exports: [],
  declarations: [HomeComponent, BannerComponent, BlogPostComponent],
  providers: [BlogsService],
})
export class HomeModule { }
