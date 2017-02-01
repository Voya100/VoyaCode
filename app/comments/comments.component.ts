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

  msgError: string = "";
  usernameError: string = "";
  postError: string = "";

  previewPost: CommentData = null;

  posting: boolean = false;

  private forbiddenNames = ['voya', 'admin'];

  constructor(private commentService: CommentsService) {
   }

  ngOnInit() {
    this.commentService.getComments().subscribe(
      data => {
        this.comments = data
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

  // Checks if message is valid
  messageCheck(){
    if(this.message.length < 5){
      this.msgError = "Message is too short!";
    }else{
      this.msgError = "";
      return true;
    }
    return false;
  }

  // Checks if name is valid
  nameCheck(){
    if(this.forbiddenNames.indexOf(this.username.toLowerCase()) != -1){
      this.usernameError = "This name is forbidden, use another.";
    }else if(this.username.length < 4){
      this.usernameError = "Username is too short.";
    }else{
      this.usernameError = "";
      return true;
    }
    return false;
  }

  // Posts comment
  postComment(preview: boolean = false){

    if(this.nameCheck() && this.messageCheck() && !this.posting){

      this.posting = true;

      this.commentService.postComment(this.username, this.message, this.private, preview).subscribe(
        (data) => {
          if(data.error === ""){
            
            if(preview){
              this.previewPost = data.data;
            }else{
              this.comments.push(data.data);
              this.previewPost = null;
              this.message = "";
            }
            console.log('success', data);
          }else{
            this.postError = data.error;
            console.log('failure', data);
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