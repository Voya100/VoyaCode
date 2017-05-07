import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';

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
  dragging = false;
  scrollStart = 0;
  dragStart = 0;
  outerHeight = 0;
  outerWidth = 0;
  innerHeight = 0;
  trackHeight = 0;
  handleHeight = 0;

  handleTop = 0;

  innerWidth = 0;
  middleScroll = 0;

  ngAfterViewInit(){
    setTimeout(() => this.setDimensions());
  }

  // Updates scrollbar (used by other classes)
  update(){
    this.updateHandle();
  }

  updateHandle(){
    if(this.innerHeight != this.middle.nativeElement.scrollHeight){
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

    let percentageVisible = this.outerHeight / this.innerHeight;
    this.handleHeight = percentageVisible > 1 ? this.trackHeight : this.trackHeight*percentageVisible;
    this.hide = this.handleHeight == this.trackHeight;
  }

  scrollHandler(){
    if(!this.dragging){
      this.updateHandle();
    }
  }

  trackClickHandler(e: MouseEvent){
    let target = <HTMLElement> e.target;
    if(target == this.track.nativeElement){
      let offsetY = e.pageY - target.getBoundingClientRect().top;
      let percentage = offsetY / this.track.nativeElement.offsetHeight;
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
