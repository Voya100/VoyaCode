import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BlogsService } from '../../shared/services/blogs.service';

@Component({
  templateUrl: 'blog-unsubscribe.component.html',
  styleUrls: ['./blog-unsubscribe.component.scss']
})
export class BlogUnsubscribeComponent implements OnInit, OnDestroy {
  message: string;
  private routeParamSub: Subscription;

  constructor(private blogService: BlogsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe(params => {
      return this.blogService.unsubscribe(params.email).subscribe(
        message => {
          this.message = message;
        },
        err => {
          this.message = err;
        }
      );
    });
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}
