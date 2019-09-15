import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-governmentlist',
  templateUrl: './governmentlist.component.html',
  styleUrls: ['./governmentlist.component.scss']
})
export class GovernmentlistComponent implements OnInit {

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
      governmentId: {
        title: 'Government ID',
        type: 'String',
      },
      companyName: {
        title: 'Company Name',
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
      organizationNumber: {
        title: 'Organization Number',
        type: 'string',
      },
      fTaxNumber: {
        title: 'F-Tax Number',
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
      governmentId: 1,
      companyName: 'ABC',
      email: 'otto@gmail.com',
      organizationNumber: '123',
      fTaxNumber: '123',
      device: 'Android',
      activity: 'adas'
    }, {
      governmentId: 2,
      companyName: 'ABC',
      email: 'otto@gmail.com',
      organizationNumber: '123',
      fTaxNumber: '123',
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
