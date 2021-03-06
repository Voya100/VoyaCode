import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BlogsService } from '../../shared/services/blogs.service';
import { Blog } from '../blog';

// Blogs page contains all blogs.
// User can open/close blog contents either individually or all at once with buttons.
// Blogs can be filtered by year.

@Component({
  templateUrl: 'blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  blog: Blog;
  error: string;

  private routeParamSub: Subscription;

  constructor(private blogsService: BlogsService, private route: ActivatedRoute) {}

  // Get blog from BlogsService
  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(params => {
      return this.blogsService.getBlog(params.id).subscribe(
        blog => {
          this.blog = blog;
        },
        e => {
          this.error = 'Blog with given id does not exist. The blog may have been removed.';
        }
      );
    });
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}
