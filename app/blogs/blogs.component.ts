import { Component, ViewChildren, OnInit, QueryList, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { BlogsService } from '../shared/services/blogs.service';
import { BlogFilterPipe } from './blog-filter.pipe';

import { BlogPostComponent } from '../shared/components/blog-post/blog-post.component';

import { Blog } from './blog';

// Blogs page contains all blogs.
// User can open/close blog contents either individually or all at once with buttons.
// Blogs can be filtered by year.

@Component({
  templateUrl: 'blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, AfterViewChecked {

  @ViewChildren(BlogPostComponent) blogPosts: QueryList<BlogPostComponent>;

  yearCheck: any = {};
  blogs: Blog[] = [];
  years: any = [];
  
  private initialised: boolean = false;

  constructor(private blogsService: BlogsService, private cdRef: ChangeDetectorRef) { }

  // Get blogs from BlogsService
  ngOnInit() { 
    this.blogsService.getBlogs().subscribe(
      blogs => this.blogInit(blogs)
    );
  }

  // To prevent "expression has changed after it was checked" exception
  ngAfterViewChecked(){
    this.initialised = true;
    this.cdRef.detectChanges();
  }

  // Initialises filter settings
  blogInit(blogs: Blog[]){
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

  // Opens all blog content
  openAll(){
    if(this.initialised){
      this.blogPosts.forEach(blog => blog.toggle(true));
    }
  }
  // Closes all blog content
  closeAll(){
    if(this.initialised){
      this.blogPosts.forEach(blog => blog.toggle(false));
    }
  }

  // Returns false if page has blog posts (that fit filters), otherwise true
  noBlogs(){
    return !this.initialised || this.blogPosts.length === 0;
  }
}