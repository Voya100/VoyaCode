import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommentData } from './comment-data';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class CommentsService {

  private url: string = '/api/comments';

  constructor(private http: Http, private auth: AuthService) { }

  // Gets comments from the server
  getComments(): Observable<CommentData[]>{
    const token = this.auth.token;
    const headers = new Headers(token ? {Authorization: 'Bearer ' + token} : {});
    const options = new RequestOptions({headers});

    return this.http.get(this.url, options).map((res: Response) => {
      return res.json().data;
    }).catch(err => {
      return null;
    });
  }

  // Posts a comment to server - comment validation is handled by server, and it can be rejected.
  // Returns observable with object {error: errorString, data: commentData}
  // errorString is an empty string, if no errors are found and comment post is successful.
  postComment(username: string, message: string, privateM: boolean, preview: boolean = false): Observable<any>{
    const data = new URLSearchParams();
    data.append('username', username);
    data.append('message', message);
    data.append('private', privateM ? '1' : '0');
    if(preview){
      data.append('preview', '1');
    }

    return this.http.post(this.url, data).map((res: Response) => {
      const result = res.json();

      return result;
    }).catch((err: Response) => {
      throw err.json().message;
    });
  }
}
