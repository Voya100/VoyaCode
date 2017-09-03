import { Component, Input, Output, EventEmitter } from '@angular/core';

// This component creates a text area that has tag options

@Component({
  selector: 'textarea-with-tags',
  templateUrl: './textarea-with-tags.component.html',
  styleUrls: ['./textarea-with-tags.component.css']
})
export class TextAreaWithtagsComponent {

  @Input() message: string;
  @Input() disabled: boolean;

  @Output() messageChange: EventEmitter<string> = new EventEmitter();

  constructor(){}
  
  // Adds tags around the current selection. Selection is moved between the tags.
  addTag(startTag: string, endTag: string, textarea: HTMLTextAreaElement){
    const beginning = textarea.selectionStart;
    const ending = textarea.selectionEnd;
    if(beginning !== null){
      const start = this.message.substring(0, beginning);
      const middle = beginning === ending ? '' : this.message.substring(beginning, ending);
      const end = this.message.substring(ending);
      this.message = start + startTag + middle + endTag + end;
      // Small delay so that position is set after view has updated
      // Caret position is set between the tags
      setTimeout(() => {
        this.setCaretPosition(start.length + startTag.length, start.length + startTag.length + (ending - beginning), textarea);
      }, 100)
    }
  }

  // Adds the tag to textarea
  tag(tag: string, textarea: HTMLTextAreaElement){
    switch(tag){
      case 'b':
      case 'i':
      case 'u':
        this.addTag('[' + tag + ']', '[/' + tag + ']', textarea)
        break;
      case 'url':
        this.addTag('[' + tag + '=]', '[/' + tag + ']', textarea);
    }
  }

  // Sets selection in textarea
  setCaretPosition(start: number, end: number, input: HTMLTextAreaElement) {
    input.setSelectionRange(start, end);  
    input.focus();
  }

  updateMessage(event: string){
    this.message = event;
    this.messageChange.emit(event);
  }
}
