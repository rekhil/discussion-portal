import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-edit-user-dialog",
  templateUrl: "./edit-user-dialog.component.html",
  styleUrls: ["./edit-user-dialog.component.scss"],
})
export class EditUserDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      userName: [{ value: this.data.userName, disabled: true }],
      email: [this.data.email, Validators.email],
      firstName: [
        this.data.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [this.data.lastName, [Validators.required]],
    });
  }

  saveUserDetails() {
    const updateUser = this.userForm.getRawValue();
    this.usersService.editUser(updateUser).subscribe(
      () => {
        this.closeDialog(true);
      },
      () => {
        this.closeDialog();
      }
    );
  }

  closeDialog(updated?: boolean) {
    this.dialogRef.close(updated);
  }
}
