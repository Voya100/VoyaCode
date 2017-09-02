import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthService } from '../authentication/auth.service';

// This component hanles admin login.

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  loading: boolean = false;
  error: string = '';

  constructor(private router: Router, private auth: AuthService){}

  ngOnInit(){
    this.auth.logout();
  }

  login(){
    if(!this.user.username){
      this.error = 'Username is required.';
      return;
    }else if(!this.user.password){
      this.error = 'Password is required.';
      return;
    }

    this.loading = true;
    this.error = '';
    
    this.auth.login(this.user.username, this.user.password).subscribe((loginSuccess) => {
      this.router.navigate(['/admin']);
    }, (err) => {
      this.loading = false;
      this.error = 'Username or password is incorrect';
    });
  }
}
