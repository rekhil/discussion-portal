import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityModule } from 'ngx-community';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    LoginRoutingModule,
    UtilityModule
  ],
})
export class LoginModule { }
