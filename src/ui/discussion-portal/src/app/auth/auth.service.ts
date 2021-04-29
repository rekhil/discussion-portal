import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserAuthenticated: boolean;
  private authState = new Subject<boolean>();

  constructor() { }

  public setAuthenticated(value) {
    this.isUserAuthenticated = value;
    this.authState.next(value);
  }

  public isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  public loggedInState() {
    return this.authState.asObservable();
  }

  public setLoggedInSession(data: any) {
    const userProfile = data ? JSON.stringify(data) : '';
    window.localStorage.setItem('discussion@profile', userProfile);
  }
}
