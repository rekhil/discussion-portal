import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserAuthenticated: boolean;
  private authState = new Subject<boolean>();
  public isAdmin: boolean;

  constructor() {
    window.localStorage.setItem("discussion@profile", "");
  }

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
    this.isAdmin = data ? data.isAdmin : false;
    const userProfile = data ? JSON.stringify(data) : '';
    window.localStorage.setItem('discussion@profile', userProfile);
  }

  public hasRoleCheck(role: string): boolean {
    return (role === 'admin') ? this.isAdmin : true;
  }
}
