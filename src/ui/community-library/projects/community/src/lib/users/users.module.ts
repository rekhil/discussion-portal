import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users/users.component";
import { CustomMaterialModule } from "../shared/custom-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";
import { DeleteConfirmationDialogComponent } from "./delete-confirmation-dialog/delete-confirmation-dialog.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { UtilityModule } from "../utility/utility.module";


@NgModule({
  declarations: [
    UsersComponent,
    EditUserDialogComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    UsersRoutingModule,
    MatDatepickerModule,
    UtilityModule
  ],
  entryComponents: [
    EditUserDialogComponent,
    DeleteConfirmationDialogComponent,
  ],
})
export class UsersModule { }
