import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from '../services/login.service';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.loginForm.controls.username.setErrors(null);
    this.loginForm.controls.password.setErrors(null);
    this.enableLogin = false;
    const data = this.loginForm.getRawValue();
    this.loginService.getUser(data.username).subscribe(
      (user) => {
        this.authService.setAuthenticated(true);
        this.authService.username = user.userName;
        this.router.navigate(['/discussions']);
      },
      () => {
        this.loginForm.controls.username.setErrors({ invalid: true });
        this.loginForm.controls.password.setErrors({ invalid: true });
        this.errorMessage = 'Enter valid username and password!';
        this.enableLogin = true;
      }
    );
  }
}
