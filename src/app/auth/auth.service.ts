import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, updateProfile } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Subject } from 'rxjs';
import { AuthData } from '../_models/auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(private router: Router, private auth: Auth) {}

  isAuthenticated = false;

  registerUser(authData: AuthData) {
    createUserWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((res) => {
        updateProfile(this.auth.currentUser, {
          displayName: authData.displayname,
        });
      })
      .catch((error) => {
        console.log('registerUser error: ', error);
      });
  }

  login(authData: AuthData) {
    signInWithEmailAndPassword(this.auth, authData.email, authData.password)
      .then((res) => {
        console.log('login: ', res);
      })
      .catch((error) => {
        console.log('login error: ', error);
      });
  }

  logout() {
    this.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
