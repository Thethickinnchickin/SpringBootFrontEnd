// // token.service.ts
// import { Injectable } from '@angular/core';
// import * as jwt from 'jsonwebtoken';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   private jwtSecret = 'supersecretthingthatissecretsupersecretthingthatissecretsupersecretthingthatissecretsupersecretthingthatissecretsupersecretthingthatissecretsupersecretthingthatissecret'; // Replace with your actual secret key

//   validateToken(authToken: string): boolean {
//     try {
//       jwt.verify(authToken, this.jwtSecret);
//       return true;
//     } catch (error) {
//       // Handle different JWT validation errors here
//       console.error('JWT validation error:', error);
//       return false;
//     }
//   }
// }
