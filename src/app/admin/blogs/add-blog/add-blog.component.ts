import { Component, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { Blog } from '../../../blogs/blog';
import { BlogsService } from '../../../shared/services/blogs.service';

@Component({
  selector: 'add-blog',
  templateUrl: 'add-blog.component.html',
  styleUrls: ['add-blog.component.scss']
})
export class AddBlogComponent {
  public routeParamSub: Subscription;

  public previewBlog: Blog;
  public loading: boolean = false;
  public error: string;
  public success: string;

  constructor(private blogsService: BlogsService) {}

  addBlog(blog: Blog) {
    this.loading = true;
    this.error = '';
    this.success = '';
    this.blogsService.addBlog(blog.name, blog.text).subscribe(
      (res: string) => {
        console.log('res', res);
        this.success = res;
        this.loading = false;
      },
      (err: Response) => {
        this.error = err.json().message;
        this.loading = false;
      }
    );
  }
}
