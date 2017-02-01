import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CommentData } from './comment-data';

import { CommentsService } from './comments.service'

@Component({
  moduleId: module.id,
  templateUrl: 'comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @ViewChild('messageBox') messageBox: ElementRef;

  comments: CommentData[] = [];

  username: string = "";
  message: string = "";
  private: boolean = false;

  postError: string = "";

  previewPost: CommentData = null;

  posting: boolean = false;

  constructor(private commentService: CommentsService) {
  }

  ngOnInit() {
    this.commentService.getComments().subscribe(
      data => {
        this.comments = data
      },
      error => {
        this.comments.push({
          username: 'Error',
          content: "Connection to server failed and comments couldn't be fetched. Check your internet connection and try again. If problem persists, contact the admin.",
          private: false,
          publishTime: '',
          editTime: ''
        })
      }
    );
  }

  // Adds tags around the current selection. Selection is moved between the tags.
  addTag(startTag: string, endTag: string, textarea: HTMLTextAreaElement){
    let beginning = textarea.selectionStart;
    let ending = textarea.selectionEnd;
    if(beginning !== null){
      let start = this.message.substring(0, beginning);
      let middle = beginning == ending ? '' : this.message.substring(beginning, ending);
      let end = this.message.substring(ending);
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
    case "b":
    case "i":
    case "u":
      this.addTag("[" + tag + "]","[/" + tag + "]", textarea)
      break;
    case "url":
      this.addTag("[" + tag + "=]","[/" + tag + "]", textarea);
    }
  }

  // Sets selection in textarea
  setCaretPosition(start: number, end: number, input: HTMLTextAreaElement) {
    input.setSelectionRange(start, end);  
    input.focus();
  }

  // Posts comment if it meets the requirements determined in backend and there isn't another comment in processing.
  // If preview is true, comment won't be sent to server's comment database - instead comment is shown under "Preview" section.
  // Message field is cleared after comment is submitted.
  postComment(preview: boolean = false){

    if(!this.posting){
      // Prevent posting while comment is being posted
      this.posting = true;

      this.commentService.postComment(this.username, this.message, this.private, preview).subscribe(
        (data) => {
          this.postError = data.error;
          if(data.error === ""){
            if(preview){
              this.previewPost = data.data;
            }else{
              this.comments.push(data.data);
              this.previewPost = null;
              this.message = "";
            }
          }
        },
        (error) => {
          this.postError = "Connection failed. Check your internet connection and try again.";
        },
        () => {
          this.posting = false;
        }
      );
    }
  }

}