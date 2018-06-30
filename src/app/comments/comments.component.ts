import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CommentData } from './comment-data';

import { CommentsService } from './comments.service';

@Component({
  templateUrl: 'comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @ViewChild('messageBox') messageBox: ElementRef;

  comments: CommentData[] = [];

  username: string = '';
  message: string = '';
  private: boolean = false;

  postError: string = '';

  previewPost: CommentData = undefined;

  posting: boolean = false;

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    this.commentService.getComments().subscribe(
      data => {
        this.comments = data;
      },
      error => {
        this.comments.push({
          username: 'Error',
          message:
            // tslint:disable-next-line:max-line-length
            "Connection to server failed and comments couldn't be fetched. Check your internet connection and try again. If problem persists, contact the admin.",
          private: false,
          post_time: '',
          update_time: ''
        });
      }
    );
  }

  // Posts comment if it meets the requirements determined in backend and there isn't another comment in processing.
  // If preview is true, comment won't be sent to server's comment database - instead comment is shown under "Preview" section.
  // Message field is cleared after comment is submitted.
  postComment(preview: boolean = false) {
    if (!this.posting) {
      // Prevent posting while comment is being posted
      this.posting = true;
      this.postError = '';

      this.commentService.postComment(this.username, this.message, this.private, preview).subscribe(
        data => {
          if (preview) {
            this.previewPost = data.data;
          } else {
            this.comments.push(data.data);
            this.previewPost = undefined;
            this.message = '';
          }
          this.posting = false;
        },
        error => {
          this.postError = error;
          this.posting = false;
        }
      );
    }
  }
}
