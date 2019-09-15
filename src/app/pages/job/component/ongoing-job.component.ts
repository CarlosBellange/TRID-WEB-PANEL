import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalservice/http.service';

@Component({
  selector: 'ngx-ongoing-job',
  templateUrl: './ongoing-job.component.html',
  styleUrls: ['./ongoing-job.component.scss']
})
export class OngoingJobComponent implements OnInit {

  companies:any;
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
    JobId: {
        title: 'Job Id',
        type: 'number',
      },
      JobCategory: {
        title: 'Job Category',
        type: 'string',
      },
      JobSubCategory: {
        title: 'Job Sub Category',
        type: 'string',
      },
      Customer: {
        title: 'Customer',
        type: 'string',
      },
      Worker: {
        title: 'Worker',
        type: 'string',
      },
      Company: {
        title: 'Company',
        type: 'string',
      },
      Taxation: {
        title: 'Taxation',
        type: 'string',
      },
      Status: {
        title: 'Status',
        type: 'string',
      },
      Action: {
        title:'Action',
        type:'string',
      },
    },
  };

  constructor(private httpcall: HttpService) { }

  ngOnInit() {

    this.httpcall.sendHttpCall('','/api/companyProfiles/all','get').subscribe((success) =>{
      console.log(success);
      this.companies = success;
    });
  }

}
