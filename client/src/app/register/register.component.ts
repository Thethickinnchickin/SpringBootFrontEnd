// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../_services/auth-service/auth.service';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const observer: Observer<any> = {
      next: (response) => {
        // Handle successful login
        console.log('Register successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // Handle login error
        console.error('Register failed:', error);
      },
      complete: () => {
        // Handle completion if needed
      },
    };

    this.authService.register(this.username, this.password).subscribe(observer);
  }
}
