import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ScrollbarComponent } from './shared/components/scrollbar/scrollbar.component';

@Component({
  selector: 'voya-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, AfterViewChecked {

  @ViewChild(ScrollbarComponent) scrollbar: ScrollbarComponent;
  @ViewChild('main') main: ElementRef;

  loadingOpen = true;
  error: boolean = true;
  height: number = 0;

  private loading: boolean = true;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    // Change title when navigating to new page
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) =>{
        this.titleService.setTitle('Voya Code' + (event['title'] == '' ? '' : ' - ' + event['title']));
      });

    // There may be a way to combine these subscribes, but I'm not sure what's the best way to do it.
    this.router.events.subscribe((event: Event) => this.loadHandler(event));
  }


  ngAfterViewChecked() {
    if(this.main.nativeElement.clientHeight != this.height){
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
  showLoading(){
    setTimeout(() => {
      if(this.loading){
        this.loadingOpen = true;
      }
    }, 100);
  }
}
