import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Blog } from '../../../blogs/blog';
import { BlogsService } from '../../../shared/services/blogs.service';

@Component({
  selector: 'edit-blog',
  templateUrl: 'edit-blog.component.html'
})
export class EditBlogComponent implements OnInit, OnDestroy {
  public routeParamSub: Subscription;

  public blog: Blog;
  public previewBlog: Blog;
  public loading: boolean = false;
  public error: string;
  public success: string;

  constructor(private route: ActivatedRoute, private blogsService: BlogsService) {}

  ngOnInit() {
    this.loading = true;
    this.routeParamSub = this.route.params.subscribe(params => {
      this.blogsService.getRawBlog(params.id).subscribe(blog => {
        this.blog = blog;
        this.loading = false;
      });
    });
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }

  editBlog() {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.blogsService.editBlog(this.blog.id, this.blog.name, this.blog.text).subscribe(
      (res: string) => {
        this.success = res;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        this.error = err.error.message;
        this.loading = false;
      }
    );
  }
}
