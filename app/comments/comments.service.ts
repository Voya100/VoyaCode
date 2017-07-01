import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommentData } from './comment-data'

@Injectable()
export class CommentsService {

  private url = "/api/comments";

  constructor(private http: Http) { }

  // Gets comments from the server
  getComments(): Observable<CommentData[]>{
    return this.http.get(this.url).map((res: Response) =>{
      return res.json().data;
    }).catch(err => {
      return null;
    });
  }

  // Posts a comment to server - comment validation is handled by server, and it can be rejected.
  // Returns observable with object {error: errorString, data: commentData}
  // errorString is an empty string, if no errors are found and comment post is successful.
  postComment(username: string, message: string, privateM: boolean, preview: boolean = false): Observable<any>{
    let data = new URLSearchParams();
    data.append('username', username);
    data.append('message', message);
    data.append('private', privateM ? '1' : '0');
    if(preview){
      data.append('preview', '1');
    }

    return this.http.post(this.url, data).map((res: Response) => {
      let result = res.json();
      result.error = res.status === 200 ? '' : result.message;
      return result;
    });
  }
}