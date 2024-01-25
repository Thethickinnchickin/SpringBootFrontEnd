// // auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { TokenService } from '../_services/token-service/token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private tokenService: TokenService, private router: Router) {}

//   canActivate(): boolean {
//     //const authToken = localStorage.getItem('user_token'); // Replace with your actual token key
//     const isValid = this.tokenService.validateToken('eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXR0aGV3IiwiaWF0IjoxNzA1OTYyNzY0LCJleHAiOjE3MDU5NjYzNjR9.qkKeyFDXMQyeferCq8nLyAfRO16ou0TLv7p_ZMrAvJqK_eF0TiinTBS7M8JR8qVs_EbcMONwWpgbUoLsyCyaIw');

//     if (isValid) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
