import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Config } from '../shared/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public menuItems = Config.menuItems;
  public isLoggedIn: boolean;
  public isDark: boolean;
  public theme: "Light" | "Dark" = "Light";
  private subscription: Subscription;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.authService.loggedInState().subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  viewProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    this.authService.setLoggedInSession(null);
    this.authService.setAuthenticated(false);
    this.router.navigate(['login']);
  }

  themeToggle() {
    this.isDark = !this.isDark;
    this.theme = (this.isDark) ? "Dark" : "Light";
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
