import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserDialogComponent } from './users/edit-user-dialog/edit-user-dialog.component';
import { DeleteConfirmationDialogComponent } from './users/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CreateUserDialogComponent } from './users/create-user-dialog/create-user-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    EditUserDialogComponent,
    DeleteConfirmationDialogComponent,
    CreateUserDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    UsersRoutingModule,
  ],
  entryComponents: [
    EditUserDialogComponent,
    DeleteConfirmationDialogComponent,
    CreateUserDialogComponent,
  ],
})
export class UsersModule {}
