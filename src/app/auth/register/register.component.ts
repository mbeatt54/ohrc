import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, confirmPasswordValidation, createPasswordStrengthValidator } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: new FormControl('test@test.com', { validators: [Validators.required, Validators.email] }),
        displayname: new FormControl(''),
        password: new FormControl('Pa$$w0rd', {
          validators: [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()],
        }),
        confirmPassword: new FormControl(''),
      },
      {
        validator: confirmPasswordValidation('password', 'confirmPassword'),
      }
    );
  }

  register() {
    // this.authService.registerUser(this.registerForm.value);
    console.log('register(): ', this.registerForm.value);
  }
}
