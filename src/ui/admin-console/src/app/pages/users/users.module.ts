import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { NbCardModule, NbIconModule, NbInputModule, NbThemeModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbThemeModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UsersModule { }
