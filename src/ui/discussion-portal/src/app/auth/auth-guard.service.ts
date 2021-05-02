import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data.role;
    if (!this.auth.isAuthenticated() || !this.auth.hasRoleCheck(role)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
