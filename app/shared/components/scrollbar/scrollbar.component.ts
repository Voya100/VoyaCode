import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'scrollbar',
  templateUrl: 'scrollbar.component.html',
  styleUrls: ['scrollbar.component.css']
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

  ngAfterViewInit(){
    setTimeout(() => this.setDimensions());
  }

  // Updates scrollbar (used by other classes)
  update(){
    this.updateHandle();
  }

  updateHandle(){
    if(this.innerHeight !== this.middle.nativeElement.scrollHeight){
      this.setDimensions();
    }
    this.handleTop = this.trackHeight*(this.middle.nativeElement.scrollTop/this.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  setDimensions(){
    this.outerHeight = this.outer.nativeElement.offsetHeight;
    this.outerWidth = this.outer.nativeElement.offsetWidth;
    this.innerWidth = this.outerWidth;

    this.innerHeight = this.middle.nativeElement.scrollHeight;
    this.trackHeight = this.track.nativeElement.offsetHeight;

    const percentageVisible = this.outerHeight / this.innerHeight;
    this.handleHeight = percentageVisible > 1 ? this.trackHeight : this.trackHeight*percentageVisible;
    this.hide = this.handleHeight === this.trackHeight;
  }

  scrollHandler(){
    if(!this.dragging){
      this.updateHandle();
    }
  }

  trackClickHandler(e: MouseEvent){
    const target = <HTMLElement> e.target;
    if(target === this.track.nativeElement){
      const offsetY = e.pageY - target.getBoundingClientRect().top;
      const percentage = offsetY / this.track.nativeElement.offsetHeight;
      this.middleScroll = percentage * this.innerHeight - (this.trackHeight/2);
      this.updateHandle();
    }
  }

  handleMouseDownHandler(e: MouseEvent){
    e.preventDefault();
    this.dragging = true;
    this.scrollStart = this.middle.nativeElement.scrollTop;
    this.dragStart = e.pageY;
  }

  @HostListener('window:mouseup', ['$event'])
  windowMouseUpHandler(e: MouseEvent){
    this.dragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
  windowMouseMoveHandler(e: MouseEvent){
    if(this.dragging){
      e.preventDefault();
      this.middleScroll = this.scrollStart - (this.dragStart-e.pageY)*(this.innerHeight/this.trackHeight);
      this.updateHandle();
    }
  }
  
}
