import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
 
@Injectable()
export class AuthService {
  public token: string;
 
  constructor(private http: Http) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('user'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    const body = {username, password};

    return this.http.post('/api/login', body)
      .map((response => response.json()))
      .map((response) => {
        const token = response && response.token;
        if (token) {
          this.token = token;
          localStorage.setItem('user', JSON.stringify({ username, token, admin: response.admin }));
          return true;
        } else {
          return false;
        }
      });
  }

  isLoggedIn(): Observable<boolean>{
    const token = this.token;
    if(!token){
      return Observable.of(false);
    }
    const headers = new Headers({Authorization: 'Bearer ' + token});
    const options = new RequestOptions({headers});
    return this.http.get('/api/check-login', options).map((res: Response) => {
      return true
    }).catch((e) => {
      return Observable.of(false);
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user');
  }
}
