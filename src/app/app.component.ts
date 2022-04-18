import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: Auth, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.authService.isAuthenticated = true;
        this.authService.authChange.next(true);
        this.router.navigateByUrl('/stocks');
      } else {
        this.authService.isAuthenticated = false;
        this.authService.authChange.next(false);
        this.router.navigateByUrl('/');
      }
    });
  }
}
