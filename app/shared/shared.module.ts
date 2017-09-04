import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnalyticsService } from './services/analytics.service';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { BlogsService } from './services/blogs.service';

import { DescriptionBoxComponent } from './components/description-box/description-box.component'
import { TextAreaWithtagsComponent } from './components/textarea-with-tags/textarea-with-tags.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [BlogPostComponent, DescriptionBoxComponent, TextAreaWithtagsComponent],
  declarations: [BlogPostComponent, DescriptionBoxComponent, TextAreaWithtagsComponent],
  providers: [AnalyticsService, BlogsService]
})
export class SharedModule { }
