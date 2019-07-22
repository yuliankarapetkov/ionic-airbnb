import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// tslint:disable-next-line: variable-name
  private _isAuthenticated = true;
  private _userId = 'abc';

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get userId(): string {
    return this._userId;
  }

  constructor() { }

  logIn(): void {
    this._isAuthenticated = true;
  }

  logOut(): void {
    this._isAuthenticated = false;
  }
}
