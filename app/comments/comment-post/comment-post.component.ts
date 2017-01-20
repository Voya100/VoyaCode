import { Component, OnInit, Input } from '@angular/core';

import { CommentData } from '../comment-data';

@Component({
  moduleId: module.id,
  selector: 'comment-post',
  templateUrl: 'comment-post.component.html',
  styleUrls: ['./comment-post.component.css']
})
export class CommentPostComponent implements OnInit {

  @Input() data: CommentData;
  @Input() isNew: boolean = false;

  constructor() { }

  ngOnInit() { }
}