// auth.service.ts
import { Store } from '@ngxs/store';
import { SetAuthToken } from './auth.state';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store) {}

  setAuthToken(token: string): void {
    this.store.dispatch(new SetAuthToken(token));
  }
}
