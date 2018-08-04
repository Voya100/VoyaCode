import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'scrollbar',
  templateUrl: 'scrollbar.component.html',
  styleUrls: ['scrollbar.component.scss']
})
export class ScrollbarComponent implements AfterViewInit {
  @ViewChild('outer') outer: ElementRef;
  @ViewChild('middle') middle: ElementRef;
  @ViewChild('inner') inner: ElementRef;
  @ViewChild('track') track: ElementRef;
  @ViewChild('handle') handle: ElementRef;

  hide: boolean = false;
  dragging: boolean = false;
  scrollStart: number = 0;
  dragStart: number = 0;
  outerHeight: number = 0;
  outerWidth: number = 0;
  innerHeight: number = 0;
  trackHeight: number = 0;
  handleHeight: number = 0;

  handleTop: number = 0;

  innerWidth: number = 0;
  middleScroll: number = 0;

  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) {
      return;
    }
    setTimeout(() => {
      this.setDimensions();
      // Before script is loaded, width should be 100 % so that page fills the screen before
      // dimensions are set.
      // 100 % width however causes scrollbar to appear. Once dimensions are set, the scrollbar
      // will disappear when middle width is set to auto
      this.middle.nativeElement.style.width = 'auto';
    });
  }

  // Updates scrollbar (used by other classes)
  update() {
    this.updateHandle();
  }

  updateHandle() {
    if (this.innerHeight !== this.middle.nativeElement.scrollHeight) {
      this.setDimensions();
    }
    this.handleTop = this.trackHeight * (this.middle.nativeElement.scrollTop / this.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  setDimensions() {
    this.outerHeight = this.outer.nativeElement.offsetHeight;
    this.outerWidth = this.outer.nativeElement.offsetWidth;
    this.innerWidth = this.outerWidth;

    this.innerHeight = this.middle.nativeElement.scrollHeight;
    this.trackHeight = this.track.nativeElement.offsetHeight;

    const percentageVisible = this.outerHeight / this.innerHeight;
    this.handleHeight = percentageVisible > 1 ? this.trackHeight : this.trackHeight * percentageVisible;
    this.hide = this.handleHeight === this.trackHeight;
  }

  scrollHandler() {
    if (!this.dragging) {
      this.updateHandle();
    }
  }

  trackClickHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target === this.track.nativeElement) {
      const offsetY = e.pageY - target.getBoundingClientRect().top;
      const percentage = offsetY / this.track.nativeElement.offsetHeight;
      this.middleScroll = percentage * this.innerHeight - this.trackHeight / 2;
      this.updateHandle();
    }
  }

  handleMouseDownHandler(e: MouseEvent) {
    e.preventDefault();
    this.dragging = true;
    this.scrollStart = this.middle.nativeElement.scrollTop;
    this.dragStart = e.pageY;
  }

  @HostListener('window:mouseup', ['$event'])
  windowMouseUpHandler(e: MouseEvent) {
    this.dragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
  windowMouseMoveHandler(e: MouseEvent) {
    if (this.dragging) {
      e.preventDefault();
      this.middleScroll = this.scrollStart - (this.dragStart - e.pageY) * (this.innerHeight / this.trackHeight);
      this.updateHandle();
    }
  }
}
