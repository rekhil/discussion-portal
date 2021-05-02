import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef } from "@angular/material/dialog";
import { UsersService } from "../../users/services/users.service";

@Component({
  selector: "app-create-user-dialog",
  templateUrl: "./create-user-dialog.component.html",
  styleUrls: ["./create-user-dialog.component.scss"],
})
export class CreateUserDialogComponent implements OnInit {
  userForm: FormGroup;
  userLoggedIn: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private _snackBar: MatSnackBar,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userLoggedIn = window.localStorage.getItem("discussion@profile") ? true : false;
    this.userForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      userName: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required]],
      isAdmin: [false]
    }, {
      validator: this.passwordValidation
    });
  }

  passwordValidation: ValidatorFn = (fg: FormGroup) => {
    let error = null;
    fg.get('confirmPassword').setErrors(null);
    if (fg.get('password').value !== fg.get('confirmPassword').value) {
      error = { error: true };
      fg.get('confirmPassword').setErrors({ invalid: true })
    }
    return error;
  }

  saveUserDetails() {
    const createUser = this.userForm.getRawValue();
    this.usersService.createUser(createUser).subscribe((response) => {
      if (response.isSuccess) {
        this.alertMessage('Created user successfully');
      } else {
        this.alertMessage('Something went wrong');
      }
      this.closeDialog(response.isSuccess);
    }, () => {
      this.alertMessage('Something went wrong');
      this.closeDialog();
    }
    );
  }

  closeDialog(updated?: boolean) {
    this.dialogRef.close(updated);
  }

  alertMessage(message: string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
