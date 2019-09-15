import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss']
})
export class CompanylistComponent implements OnInit {

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
      companyId: {
        title: 'Company ID',
        type: 'String',
      },
      companyName: {
        title: 'Company Name',
        type: 'String',
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
      companyId: 1,
      companyName: 'Mark',
      email: 'otto@gmail.com',
      contactNumber: '9876543210',
      organizationNumber: 123,
      fTaxNumber: 123,
      device: 'Android',
      activity: 'Enable'
    }, {
      companyId: 2,
      companyName: 'Johny Deph',
      email: 'johny@gmail.com',
      contactNumber: '9876543210',
      organizationNumber: 123,
      fTaxNumber: 123,
      device: 'Android',
      activity: 'Enable'
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
