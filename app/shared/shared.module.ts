import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { BlogPostComponent }   from './components/blog-post/blog-post.component';
import { BlogsService } from './services/blogs.service'

@NgModule({
  imports: [CommonModule],
  exports: [BlogPostComponent],
  declarations: [BlogPostComponent],
  providers: [BlogsService],
})
export class SharedModule { }
