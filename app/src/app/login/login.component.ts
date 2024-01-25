// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../_services/auth-service/auth.service';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
    private router: Router) {}

  login() {
    const observer: Observer<any> = {
      next: (response) => {
        // Handle successful login
        console.log('Login successful:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        // Handle login error
        console.error('Login failed:', error);
      },
      complete: () => {
        // Handle completion if needed
      },
    };

    this.authService.login(this.username, this.password).subscribe(observer);
  }
}
