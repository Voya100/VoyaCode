import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { BlogFilterPipe } from './blog-filter.pipe';
import { BlogsComponent } from './blogs.component';

import { BlogComponent } from './blog/blog.component';
import { BlogSubscribeConfirmComponent } from './subscribe-confirm/blog-subscribe-confirm.component';
import { BlogSubscribeComponent } from './subscribe/blog-subscribe.component';
import { BlogUnsubscribeComponent } from './unsubscribe/blog-unsubscribe.component';

import { routing } from './blogs.routing';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, routing],
  exports: [],
  declarations: [
    BlogsComponent,
    BlogComponent,
    BlogSubscribeConfirmComponent,
    BlogSubscribeComponent,
    BlogUnsubscribeComponent,
    BlogFilterPipe
  ],
  providers: []
})
export class BlogsModule {}
