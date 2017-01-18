import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../shared/services/blogs.service';
import { BlogFilterPipe } from './blog-filter.pipe';

@Component({
  moduleId: module.id,
  templateUrl: 'blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  filteredBlogs: any = [];
  yearCheck: any = {'2016': false, '2017': true};

  private years: any = [];
  private blogs: any = [];

  constructor(private blogsService: BlogsService) { }

  ngOnInit() { 
    this.blogsService.getBlogs().subscribe(
      blogs => this.blogInit(blogs)
    );
  }

  blogInit(blogs: any){
    if(blogs.length > 0){
      this.blogs = blogs;
      let yearMin = 2016;
      let yearMax = blogs[0].year;
      for(let y = yearMax; y >= yearMin; y--){
        this.years.push(y);
        this.yearCheck[y] = true;
      }
    }
  }
}