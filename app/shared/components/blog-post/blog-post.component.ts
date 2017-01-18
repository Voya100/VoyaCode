import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'blog-post',
  templateUrl: 'blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  @Input() blogData: any;
  @Input() minimizable: boolean = false;
  @Input() visible: boolean = false;

  constructor() { 
  }

  ngOnInit() { 
  }

}