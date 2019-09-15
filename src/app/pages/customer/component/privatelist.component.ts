import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-privatelist',
  templateUrl: './privatelist.component.html',
  styleUrls: ['./privatelist.component.scss']
})
export class PrivatelistComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false,
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
      privateId: {
        title: 'Private ID',
        type: 'String',
      },
      customerName: {
        title: 'Customer Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      contactNumber: {
        title: 'Contact Number',
        type: 'string',
      },
      device: {
        title: 'Device',
        type: 'string',
      },
      activity: {
        title: 'Activity',
        type: 'String',
      },
    },
    mode: 'external',
  };

  source: LocalDataSource = new LocalDataSource();
  isEnable: boolean = false;
  data = [];

  constructor() { }

  ngOnInit() {

    let data = [{
      privateId: 1,
      customerName: 'Mark',
      email: 'otto@gmail.com',
      contactNumber: '9876543210',
      device: 'Android',
      activity: 'adas'
    }, {
      privateId: 2,
      customerName: 'Bale',
      email: 'bale@gmail.com',
      contactNumber: '9876543210',
      device: 'Android',
      activity: 'adas'
    }];

    this.source.load(data);

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
