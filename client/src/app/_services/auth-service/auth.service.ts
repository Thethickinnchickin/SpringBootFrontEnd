// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, from, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Replace with your Spring Boot API URL
  private tokenKey = 'user_token'

  constructor() {}

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };

    // auth.service.ts
    // ...

    return new Observable((observer: Observer<any>) => {
      fetch(`${this.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text(); // Use text() instead of json()
        })
        .then(data => {
          try {
            const jsonData = JSON.parse(data);
            localStorage.setItem('user_token', jsonData.token);
            observer.next(jsonData);
            observer.complete();
          } catch (error) {
            console.error('Failed to parse JSON:', error);
            observer.error('An error occurred during login.');
          }
        })
        .catch(error => {
          console.error('Login failed:', error);
          observer.error(error.message || 'An error occurred during login.');
        });
    });
  }

  register(username: string, password: string): Observable<any> {
    const loginData = { username, password };

  // auth.service.ts
  // ...

  return new Observable((observer: Observer<any>) => {
    fetch(`${this.apiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Use text() instead of json()
      })
      .then(data => {
        try {
          const jsonData = JSON.parse(data);
          observer.next(jsonData);
          observer.complete();
        } catch (error) {
          console.error('Failed to parse JSON:', error);
          observer.error('An error occurred during login.');
        }
      })
      .catch(error => {
        console.error('Login failed:', error);
        observer.error(error.message || 'An error occurred during login.');
      });
  });
  }

  // Set the authentication token in local storage
  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get the authentication token from local storage
  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getAuthToken(); // Returns true if a token is present, otherwise false
  }

  // Logout the user by removing the token from local storage
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
