import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-create-user-dialog",
  templateUrl: "./create-user-dialog.component.html",
  styleUrls: ["./create-user-dialog.component.scss"],
})
export class CreateUserDialogComponent implements OnInit {
  userForm: FormGroup;
  toppingList: string[] = [
    "Brandng",
    "UI/UX",
    "Web-Design",
    "Packaging",
    "Print & Editorial",
  ];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      userName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", [Validators.required, Validators.minLength(2)]],
      lastName: ["", [Validators.required]],
      phone: [""],
      address: [""],
      jobTitle: [""],
      skills: [""],
      gender: [""],
      dob: [""],
    });
  }

  saveUserDetails() {
    const createUser = this.userForm.getRawValue();
    this.usersService.createUser(createUser).subscribe(
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
