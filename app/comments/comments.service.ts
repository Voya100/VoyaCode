import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommentData } from './comment-data'

@Injectable()
export class CommentsService {

  private url = "http://voyacode.com/php/getComments.php";

  constructor(private http: Http) { }

  // 
  getComments(): Observable<CommentData[]>{
    return this.http.get(this.url).map((res: Response) =>{
      return res.json().data;
    }).catch(err => {
      return null;
    });
    /*
    return [{
      username: 'Voya',
      content: "I have now got the comments page ready. You can give here feedback regarding projects or the website itself, or just comment whatever you like (as long as it isn't spam). <br><br>At the moment commenting don't require registration, but I may do a system for it at a later date. ",
      publishTime: '17.01.2016 19:36',
      editTime: '05.08.2016 22:46',
      admin: true,
      private: false
    }];
    */
  }

  postComment(): Observable<any>{
    return null;
  }
}