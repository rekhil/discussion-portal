import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users/users.component";
import { CustomMaterialModule } from "../shared/custom-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { DeleteConfirmationDialogComponent } from "./delete-confirmation-dialog/delete-confirmation-dialog.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
@NgModule({
  declarations: [
    UsersComponent,
    EditUserDialogComponent,
    CreateUserDialogComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    UsersRoutingModule,
    MatDatepickerModule,
  ],
  entryComponents: [
    EditUserDialogComponent,
    CreateUserDialogComponent,
    DeleteConfirmationDialogComponent,
  ],
})
export class UsersModule {}
