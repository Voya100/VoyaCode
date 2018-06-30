import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Blog } from '../../blogs/blog';
import { AuthService } from '../../authentication/auth.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

interface BasicResponse{
  message: string;
}

@Injectable()
export class BlogsService {

  private url: string = '/api/blogs';

  constructor(private http: HttpClient, private auth: AuthService) { }

  // Gets blogs from server in the order of newest -> oldest.
  // Limit can be used to limit how many are fetched. Limit 0 gets all blogs.
  getBlogs(limit: number = 0): Observable<Blog[]>{
    return this.http.get(this.url + (limit ? '?limit=' + limit : '')).map((response: {data: Blog[]}) => {
      return response.data || [{
        id: 0,
        name: 'Blog search failed.',
        text: 'Sorry, something went wrong. If this problem persists, report to the admin through comments page.',
        date: '',
        year: 0
      }];
    })
    .catch(err => {
      return [[{
        id: 0,
        name: 'Blog search failed.',
        // tslint:disable-next-line:max-line-length
        text: 'Sorry, something went wrong and blog couldn\'t be fetched from the server. Check your internet connection and refresh the page.<br><br>If problem persists, report to the admin through comments page.',
        date: '',
        year: 0
      }]];
    });
  }

  getBlog(id: string): Observable<Blog>{
    return this.http.get(this.url + '/' + id).map((res: {data: Blog}) => {
      return res.data;
    });
  }

  // Returns blog without html conversion
  getRawBlog(id: string): Observable<Blog>{
    return this.http.get(this.url + '/raw/' + id).map((res: {data: Blog}) => {
      return res.data;
    });
  }

  getBlogPreview(name: string, text: string){
    const token = this.auth.token;
    const headers = new HttpHeaders(token ? {Authorization: 'Bearer ' + token} : {});
    const options = {headers};
    return this.http.post(this.url + '/preview', {name, text}, options);
  }

  addBlog(name: string, text: string){
    const token = this.auth.token;
    const headers = new HttpHeaders(token ? {Authorization: 'Bearer ' + token} : {});
    const options = {headers};

    return this.http.post(this.url, {name, text}, options).map((res) => {
      return 'Blog added successfully.';
    });
  }

  editBlog(id: number, name: string, text: string){
    const token = this.auth.token;
    const headers = new HttpHeaders(token ? {Authorization: 'Bearer ' + token} : {});
    const options = {headers};

    return this.http.put(this.url + '/' + id, {name, text}, options).map((res) => {
      return 'Blog edited successfully.';
    });
  }

  deleteBlog(id: number){
    const token = this.auth.token;
    const headers = new HttpHeaders(token ? {Authorization: 'Bearer ' + token} : {});
    const options = {headers};
    return this.http.delete(this.url + '/' + id, options).map(() => {
      return 'Blog deleted successfully.';
    });
  }

  sendSubscribeConfirmation(email: string): Observable<string>{
    return this.http.post<BasicResponse>(this.url + '/subscribe', {email})
      .map((res) => res.message)
      .catch((err: BasicResponse) => Observable.throw(err.message));
  }

  subscribe(encodedEmail: string){
    return this.http.post<BasicResponse>(this.url + '/subscribe/' + encodedEmail, {})
      .map(res => res.message)
      .catch((err: BasicResponse) => Observable.throw(err.message));
  }

  unsubscribe(encodedEmail: string){
    return this.http.post<BasicResponse>(this.url + '/unsubscribe/' + encodedEmail, {})
      .map(res => res.message)
      .catch((err: BasicResponse) => Observable.throw(err.message));
  }

}
