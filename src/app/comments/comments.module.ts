import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CommentsComponent } from './comments.component';
import { CommentPostComponent } from './comment-post/comment-post.component';

import { CommentsService } from './comments.service';

import { routing } from './comments.routing';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, routing],
  exports: [],
  declarations: [CommentsComponent, CommentPostComponent],
  providers: [CommentsService]
})
export class CommentsModule { }
