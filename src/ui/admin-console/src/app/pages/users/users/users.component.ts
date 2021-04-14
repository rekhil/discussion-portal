import { Component } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { users } from '../users-list';
// import { Ng2SmartTableModule } from 'ng2-smart-table';

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
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      userID: {
        title: 'ID',
        filter: false
      },
      name: {
        title: 'Name',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      status: {
        title: 'Status',
        filter: false
      }
    }
  
  };

  source: LocalDataSource = new LocalDataSource();

  constructor() {
    const data = users;
    this.source.load(data);
    // console.log(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
