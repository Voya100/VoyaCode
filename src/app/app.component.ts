import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { filter, map, mergeMap } from 'rxjs/operators';

import { ScrollbarComponent } from './shared/components/scrollbar/scrollbar.component';
import { AnalyticsService } from './shared/services/analytics.service';

@Component({
  selector: 'voya-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild(ScrollbarComponent) scrollbar: ScrollbarComponent;
  @ViewChild('main') main: ElementRef;

  loadingOpen: boolean = true;
  error: boolean = true;
  height: number = 0;

  private loading: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private analytics: AnalyticsService,
    private updateService: SwUpdate,
    private snackBar: MatSnackBar
  ) {
    this.updateService.available.subscribe(event => {
      this.promptWebsiteUpdate();
    });
  }

  ngOnInit() {
    // Change title when navigating to new page
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      )
      .subscribe(event => {
        this.titleService.setTitle('Voya Code' + (event['title'] ? ' - ' + event['title'] : ''));
      });

    // There may be a way to combine these subscribes, but I'm not sure what's the best way to do it.
    this.router.events.subscribe((event: Event) => this.loadHandler(event));

    this.analytics.initialiseAnalytics();
  }

  ngAfterViewChecked() {
    if (this.main.nativeElement.clientHeight !== this.height) {
      this.height = this.main.nativeElement.clientHeight;
      setTimeout(() => this.scrollbar.update());
    }
  }

  loadHandler(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
      this.error = false;
      this.showLoading();
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      this.loadingOpen = false;
      this.analytics.pageView(event.urlAfterRedirects);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel || event instanceof NavigationError) {
      this.loading = false;
      this.loadingOpen = false;
    }
    if (event instanceof NavigationError) {
      this.error = true;
    }
  }

  // Show loading screen after small delay, if page hasn't loaded yet
  showLoading() {
    setTimeout(() => {
      if (this.loading) {
        this.loadingOpen = true;
      }
    }, 100);
  }

  promptWebsiteUpdate() {
    // Service worker has fetched newer version of the site,
    // asks whether user would like to refresh
    this.snackBar
      .open('An updated version of the website is available.', 'Refresh', {
        announcementMessage: 'You can update the website to the newest version by refreshing.',
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 30000
      })
      .onAction()
      .subscribe(async () => {
        await this.updateService.activateUpdate();
        document.location.reload();
      });
  }
}
