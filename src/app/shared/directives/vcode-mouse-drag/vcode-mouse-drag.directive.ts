import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

// Outputs a mouse event when mouse is moved while mouse is being pressed down

@Directive({ selector: '[vCodeMouseDrag]' })
export class VCodeMouseDragDirective {

  mouseDown: boolean = false;

  @Output() vCodeMouseDrag: EventEmitter<MouseEvent> = new EventEmitter();

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent){
    if(this.mouseDown){
      this.vCodeMouseDrag.emit(event);
    }
  }

  @HostListener('mouseup')
  onMouseUp(){
    this.mouseDown = false;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent){
    this.mouseDown = true;
    this.vCodeMouseDrag.emit(event);
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.mouseDown = false;
  }
}
