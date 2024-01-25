// // token-storage.service.ts
// import { Injectable } from '@angular/core';

// export interface TokenStorage {
//   setToken(token: string): void;
//   getToken(): string | null;
//   clearToken(): void;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenStorageService implements TokenStorage {
//   private readonly tokenKey = 'user_token';

//   setToken(token: string): void {
//     localStorage.setItem(this.tokenKey, token);
//   }

//   getToken(): string | null {
//     if (typeof localStorage !== 'undefined') {
//       return localStorage.getItem(this.tokenKey);
//     }
//     return null;
//   }

//   clearToken(): void {
//     localStorage.removeItem(this.tokenKey);
//   }
// }
