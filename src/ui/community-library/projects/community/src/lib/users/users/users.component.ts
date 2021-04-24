import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { CreateUserDialogComponent } from "../create-user-dialog/create-user-dialog.component";
import { DeleteConfirmationDialogComponent } from "../delete-confirmation-dialog/delete-confirmation-dialog.component";
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { UsersService } from "../services/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "userName",
    "firstName",
    "lastName",
    "email",
    "edit",
    "delete",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.searchUser("").subscribe((users) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createUser() {
    this.dialog
      .open(CreateUserDialogComponent, {
        width: "500px",
        disableClose: true,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.fetchUsers();
        }
      });
  }

  editUser(user) {
    this.dialog
      .open(EditUserDialogComponent, {
        data: user,
        width: "500px",
        disableClose: true,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.fetchUsers();
        }
      });
  }

  deleteUser(user) {
    this.dialog
      .open(DeleteConfirmationDialogComponent, {
        width: "500px",
        disableClose: true,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.usersService.deleteUser(user.userName).subscribe((response) => {
            this.fetchUsers();
          });
        }
      });
  }
}
