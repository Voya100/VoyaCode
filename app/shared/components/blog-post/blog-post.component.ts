import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'blog-post',
  templateUrl: 'blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  encapsulation: ViewEncapsulation.None
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