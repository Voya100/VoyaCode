import { Component, OnInit } from '@angular/core';

import { BlogsService } from '../blogs/blogs.service'

@Component({
  moduleId: module.id,
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blog: any = {};
  constructor(private blogs: BlogsService) { 

  }

  ngOnInit() { 
    this.blogs.getBlogs(1).subscribe(
      blog => {
        this.blog = blog[0]
      }
    );
  }
}