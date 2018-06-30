import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogsService } from '../../shared/services/blogs.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'blog-subscribe.component.html',
  styleUrls: ['./blog-subscribe.component.scss']
})
export class BlogSubscribeComponent implements OnInit, OnDestroy {

  message: string;
  private routeParamSub: Subscription;

  constructor(private blogService: BlogsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeParamSub = this.route.params.subscribe((params) => {
      return this.blogService.subscribe(params.email).subscribe(
        (message) => {
          this.message = message as string;
        },
        (err) => {
          this.message = err;
        });
    });
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }

}
