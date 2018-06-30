import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../authentication/auth.service';

import { CommentData } from './comment-data';

@Injectable()
export class CommentsService {
  private url: string = '/api/comments';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // Gets comments from the server
  getComments(): Observable<CommentData[]> {
    const token = this.auth.token;
    const headers = new HttpHeaders(token ? { Authorization: 'Bearer ' + token } : {});
    const options = { headers };

    return this.http
      .get<{ data: CommentData[] }>(this.url, options)
      .map(response => response.data)
      .catch(err => Observable.of(undefined));
  }

  // Posts a comment to server - comment validation is handled by server, and it can be rejected.
  // Returns observable with object {error: errorString, data: commentData}
  // errorString is an empty string, if no errors are found and comment post is successful.
  postComment(username: string, message: string, privateM: boolean, preview: boolean = false): Observable<any> {
    const data = {
      username,
      message,
      private: privateM ? '1' : '0',
      preview: preview ? '1' : '0'
    };

    return this.http.post(this.url, data).catch(err => {
      throw err.error.message;
    });
  }
}
