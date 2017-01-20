import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

import { CommentsComponent }   from './comments.component';
import { CommentPostComponent } from './comment-post/comment-post.component';

import { CommentsService } from './comments.service';

import { routing } from './comments.routing';

@NgModule({
  imports: [CommonModule, routing],
  exports: [],
  declarations: [CommentsComponent, CommentPostComponent],
  providers: [CommentsService],
})
export class CommentsModule { }
