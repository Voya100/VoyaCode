import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { BlogPostComponent }   from './components/blog-post/blog-post.component';
import { BlogsService } from './services/blogs.service'

import { DescriptionBoxComponent } from './components/description-box/description-box.component'

@NgModule({
  imports: [CommonModule],
  exports: [BlogPostComponent, DescriptionBoxComponent],
  declarations: [BlogPostComponent, DescriptionBoxComponent],
  providers: [BlogsService],
})
export class SharedModule { }
