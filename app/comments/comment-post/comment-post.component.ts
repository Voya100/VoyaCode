import { Component, Input } from '@angular/core';

import { CommentData } from '../comment-data';

@Component({
  selector: 'comment-post',
  templateUrl: 'comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent {

  @Input() data: CommentData;
  @Input() isNew: boolean = false;

}
