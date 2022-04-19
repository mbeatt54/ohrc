import { Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, Auth, updateProfile } from '@angular/fire/auth';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Subject } from 'rxjs';
import { AuthData } from '../_models/auth-data.model';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
    return !passwordValid ? { passwordStrength: true } : null;
  };
}

export function confirmPasswordValidation(password: string, confirmPassword: string) {
  return (formGroup: FormGroup): any => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  };
}

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
