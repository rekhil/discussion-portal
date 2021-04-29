import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from '../services/login.service';
import { CreateUserDialogComponent } from "ngx-community";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  enableLogin: boolean;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    this.dialog
      .open(CreateUserDialogComponent, {
        width: "500px",
        disableClose: true,
      })
      .afterClosed()
      .subscribe((response) => {

      });
  }

  login() {
    this.loginForm.controls.username.setErrors(null);
    this.loginForm.controls.password.setErrors(null);
    this.enableLogin = false;
    const data = this.loginForm.getRawValue();
    this.loginService.getUser(data.username).subscribe((data) => {
      if (data && this.validLogin(data.userName, data.userName)) {
        this.authService.setLoggedInSession(data);
        this.authService.setAuthenticated(true);
        this.authService.username = data.userName;
        this.router.navigate(['/discussions']);
      } else {
        this.throwLoginError();
      }
    }, () => {
      this.throwLoginError();
    }
    );
  }

  throwLoginError() {
    this.loginForm.get('username').setErrors({ invalid: true });
    this.loginForm.get('password').setErrors({ invalid: true });
    this.errorMessage = 'Enter valid username and password!';
    this.enableLogin = true;
  }

  validLogin(user: string, pass: string) {
    const { username, password } = this.loginForm.getRawValue();
    return user === username && pass === password;
  }
}
