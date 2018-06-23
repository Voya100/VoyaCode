import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public token: string;
  // Cached login status
  public loggedIn: boolean;
  // If user has logged in earlier, login link should be shown
  public hasUser: boolean = false;

  constructor(private http: Http, private storage: LocalStorageService) {
    // set token if saved in local storage
    this.token = this.getToken();
    this.hasUser = JSON.parse(storage.get('hasUser'));
    this.checkLogin();
  }

  getToken(){
    const currentUser = JSON.parse(this.storage.get('user'));
    return currentUser && currentUser.token;
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
          localStorage.setItem('hasUser', 'true');
          return true;
        } else {
          return false;
        }
      });
  }

  checkLogin(): Observable<boolean>{
    const token = this.getToken();
    if(!token){
      this.loggedIn = false;
      return Observable.of(false);
    }
    const headers = new Headers({Authorization: 'Bearer ' + token});
    const options = new RequestOptions({headers});
    return this.http.get('/api/check-login', options).map((res: Response) => {
      this.loggedIn = true;
      return true;
    }).catch((e) => {
      this.loggedIn = false;
      return Observable.of(false);
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('user');
  }
}
