import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent implements OnInit {
  @Input() blogData: any;
  @Input() minimizable: boolean = false;
  @Input() visible: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggle(open: boolean = !this.visible) {
    this.visible = open;
  }
}
