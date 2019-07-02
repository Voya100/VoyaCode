import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageModule } from 'angular-2-local-storage';

import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { DescriptionBoxComponent } from './components/description-box/description-box.component';
import { TextAreaWithtagsComponent } from './components/textarea-with-tags/textarea-with-tags.component';
import { VCodeMouseDragDirective } from './directives/vcode-mouse-drag/vcode-mouse-drag.directive';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { AnalyticsService } from './services/analytics.service';
import { BlogsService } from './services/blogs.service';
import { PushService } from './services/push.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LocalStorageModule.forRoot({
      prefix: 'voyacode',
      storageType: 'localStorage'
    })
  ],
  exports: [
    BlogPostComponent,
    DescriptionBoxComponent,
    TextAreaWithtagsComponent,
    VCodeMouseDragDirective,
    CapitalizePipe
  ],
  declarations: [
    BlogPostComponent,
    DescriptionBoxComponent,
    TextAreaWithtagsComponent,
    VCodeMouseDragDirective,
    CapitalizePipe
  ],
  providers: [AnalyticsService, BlogsService, PushService]
})
export class SharedModule {}
