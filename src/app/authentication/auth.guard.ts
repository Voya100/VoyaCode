import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate() {
    return this.auth.checkLogin().map(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
      return isLoggedIn;
    });
  }
}
