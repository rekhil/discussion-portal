import { Component } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { UsersService } from '../services/users.service';
import { users } from '../users-list';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      userName: {
        title: 'Username',
        filter: false,
        editable: false
      },
      firstName: {
        title: 'First Name',
        filter: false
      },
      lastName: {
        title: 'Last Name',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      }
    }

  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private usersService: UsersService) {
    const data = users;
    this.source.load(data);
    this.usersService.searchUser('')
      .subscribe(response => {
        response ? this.source.load(response) : this.source.load(data);
      }, () => {
        this.source.load(data);
      })
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.usersService.createUser(event.newData).subscribe();
  }

  onEditConfirm(event): void {
    event.confirm.resolve();
    this.usersService.editUser(event.newData).subscribe();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.usersService.deleteUser(event.data.userName).subscribe();
    } else {
      event.confirm.reject();
    }
  }

}
