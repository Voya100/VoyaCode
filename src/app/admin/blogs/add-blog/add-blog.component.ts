import { Component } from '@angular/core';
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
  public errors: string[];
  public success: string;

  constructor(private blogsService: BlogsService) {}

  addBlog(blog: Blog) {
    this.loading = true;
    this.errors = [];
    this.success = '';
    this.blogsService.addBlog(blog.name, blog.text).subscribe(
      (res: string) => {
        this.success = res;
        this.loading = false;
      },
      (err: string | string[]) => {
        this.errors = Array.isArray(err) ? err : [err];
        this.loading = false;
      }
    );
  }
}
