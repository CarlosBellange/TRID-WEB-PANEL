import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalservice/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-completed-job',
  templateUrl: './completed-job.component.html',
  styleUrls: ['./completed-job.component.scss']
})
export class CompletedJobComponent implements OnInit {

  companies:any;
  settings = {
    add: {
      addButtonContent: '<i class="fas fa-arrow-alt-circle-right"></i>',
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
    mode: 'external',
  };

  constructor(private httpcall: HttpService,
              private router:Router) { }





  ngOnInit() {
    this.httpcall.sendHttpCall('','/api/companyProfiles/all','get').subscribe((success) =>{
      console.log(success);
      this.companies = success;
    });
  }

  opencompletedjobModal(){
    //  this.modalService.open(AddCompanyComponent, {}).result.then((res) => {
    //   //this.getChildMenuList();
    // })
    console.log('sjfgyschdscyvsycscb');
    
    this.router.navigate(['/pages/job/Completed-job-details']);
    
  }

}
