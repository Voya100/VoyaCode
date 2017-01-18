import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../shared/services/blogs.service'

@Component({
  moduleId: module.id,
  templateUrl: 'blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: any = [];

  constructor(private blogsService: BlogsService) { }

  ngOnInit() { 
    this.blogsService.getBlogs().subscribe(
      blogs => this.blogs = blogs
    );
  }
}