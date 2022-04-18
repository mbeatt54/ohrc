import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../_models/auth-data.model';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User;

  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString(),
      displayname: authData.displayname,
    };
    this.authChange.next(true);
    this.router.navigateByUrl('/');
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100000).toString(),
      displayname: '',
    };
    this.authChange.next(true);
    this.router.navigateByUrl('/stocks');
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigateByUrl('/');
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
