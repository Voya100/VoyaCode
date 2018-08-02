import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { BlogPostComponent } from '../shared/components/blog-post/blog-post.component';
import { BlogsService } from '../shared/services/blogs.service';
import { PushService } from '../shared/services/push.service';

import { Blog } from './blog';

// Blogs page contains all blogs.
// User can open/close blog contents either individually or all at once with buttons.
// Blogs can be filtered by year.

// State of (un)subscription request
enum PushSubscriptionStateMessage {
  NotStarted,
  InProgress,
  AlreadyRegistered,
  Successful,
  Failed
}

@Component({
  templateUrl: 'blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, AfterViewChecked {
  @ViewChildren(BlogPostComponent) blogPosts: QueryList<BlogPostComponent>;

  yearCheck: { [key: number]: boolean } = {};
  blogs: Blog[] = [];
  years: any = [];

  hasPushSubscription: boolean = false;
  pushSubscriptionState = PushSubscriptionStateMessage.NotStarted;
  pushSubscriptionStates = PushSubscriptionStateMessage;

  private initialised: boolean = false;

  constructor(private blogsService: BlogsService, private pushService: PushService, private cdRef: ChangeDetectorRef) {}

  get pushSubscriptionSupported() {
    return this.pushService.browserSupportsPushNotifications();
  }

  // Get blogs from BlogsService
  ngOnInit() {
    this.blogsService.getBlogs().subscribe(blogs => this.blogInit(blogs));
    this.hasPushSubscription = this.pushService.isSubscribedToTopic('blogs');
  }

  // To prevent "expression has changed after it was checked" exception
  ngAfterViewChecked() {
    this.initialised = true;
    this.cdRef.detectChanges();
  }

  // Initialises filter settings
  blogInit(blogs: Blog[]) {
    if (blogs.length > 0) {
      this.blogs = blogs;
      const yearMin = 2016;
      const yearMax = blogs[0].year;
      for (let y = yearMax; y >= yearMin; y--) {
        this.years.push(y);
        this.yearCheck[y] = true;
      }
    }
  }

  // Opens all blog content
  openAll() {
    if (this.initialised) {
      this.blogPosts.forEach(blog => blog.toggle(true));
    }
  }
  // Closes all blog content
  closeAll() {
    if (this.initialised) {
      this.blogPosts.forEach(blog => blog.toggle(false));
    }
  }

  // Returns false if page has blog posts (that fit filters), otherwise true
  noBlogs() {
    return !this.initialised || this.blogPosts.length === 0;
  }

  async subscribeToPushNotifications() {
    console.log('subscribe');
    this.pushSubscriptionState = PushSubscriptionStateMessage.InProgress;
    try {
      await this.pushService.subscribeToBlogNotifications();
      this.hasPushSubscription = this.pushService.isSubscribedToTopic('blogs');
      this.pushSubscriptionState = PushSubscriptionStateMessage.Successful;
    } catch (err) {
      // TODO: Already registered message
      console.warn(err);
      this.pushSubscriptionState = PushSubscriptionStateMessage.Failed;
    }
  }

  async unsubscribeFromPushNotifications() {
    this.pushSubscriptionState = PushSubscriptionStateMessage.InProgress;
    try {
      await this.pushService.unsubscribeFromBlogNotifications();
      this.hasPushSubscription = this.pushService.isSubscribedToTopic('blogs');
      this.pushSubscriptionState = PushSubscriptionStateMessage.Successful;
    } catch (err) {
      // TODO: Already registered message
      console.warn(err);
      this.pushSubscriptionState = PushSubscriptionStateMessage.Failed;
    }
  }
}
