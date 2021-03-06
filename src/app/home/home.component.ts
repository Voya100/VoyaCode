import { Component, OnInit } from '@angular/core';

import { Blog } from '../blogs/blog';
import { BlogsService } from '../shared/services/blogs.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blog: Blog = undefined;
  constructor(private blogs: BlogsService) {}

  ngOnInit() {
    this.blogs.getBlogs(1).subscribe(blog => {
      this.blog = blog[0];
    });
  }
}
