import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BlogsService {

  private url = "http://voyacode.com/php/blogs.php";

  constructor(private http: Http) { }

  // Gets blogs from server in the order of newest -> oldest.
  // Limit can be used to limit how many are fetched. Limit 0 gets all blogs.
  getBlogs(limit: number = 0){
    return this.http.get(this.url + (limit ? '?limit=' + limit : '')).map((res: Response) =>{
      console.log(res);
      console.log(res.json());
      return res.json().data || [{
        id: 0,
        name: "Blog search failed.",
        text: "Sorry, something went wrong. If this problem persists, report to the admin through comments page."
      }];
    }).catch(err => {
      return [[{
        id: 0,
        name: "Blog search failed (error: " + err + ").",
        text: "Sorry, something went wrong and blog couldn't be fetched from the server. Check your internet connection and refresh the page.<br><br>If problem persists, report to the admin through comments page."
      }]];
    });
  }
}