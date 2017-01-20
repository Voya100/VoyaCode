import { Component, OnInit } from '@angular/core';

import { CommentData } from './comment-data';

import { CommentsService } from './comments.service'

@Component({
  moduleId: module.id,
  templateUrl: 'comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: CommentData[] = [];

  constructor(private commentService: CommentsService) {
   }

  ngOnInit() {
    this.commentService.getComments().subscribe(
      data => {
        console.log(data);
        this.comments = data
      }
    );
   }
}