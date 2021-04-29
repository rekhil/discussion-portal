import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserDialogComponent } from "./create-user-dialog/create-user-dialog.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    CreateUserDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    MatDatepickerModule
  ],
  exports: [
    CreateUserDialogComponent
  ],
  entryComponents: [
    CreateUserDialogComponent
  ]
})
export class UtilityModule { }
