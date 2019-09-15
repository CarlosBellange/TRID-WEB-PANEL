import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../globalservice/share.service';
import { DatePipe } from '@angular/common';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Component({
  selector: 'ngx-assign-job',
  templateUrl: './assign-job.component.html',
  styleUrls: ['./assign-job.component.scss']
})
export class AssignJobComponent implements OnInit {

  jobs: any[] = [];
  settings = {
    add: {
      addButtonContent: '<i></i>',
      createButtonContent: '<i></i>',
      cancelButtonContent: '<i></i>',
      confirmCreate: false,
    },
    edit: {
      editButtonContent: '<i ></i>',
      saveButtonContent: '<i ></i>',
      cancelButtonContent: '<i ></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {

      name: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      mobile: {
        title: 'Mobile',
        type: 'number',
      },
      createdAt: {
        title: 'Created At',
        type: 'date',
      },
    },
    mode: 'external',
  };

  source: LocalDataSource = new LocalDataSource();
  companyList: any;
  nodataFoundMsg: String = '';
  workers: any;
  selectedJobData: any;

  constructor(
    private httpcall: HttpService,
    private router: Router,
    private shareService: ShareService,
    private toastrService: NbToastrService,
  ) {

    this.selectedJobData = this.shareService.getdata();
    console.log(this.selectedJobData);

  }

  ngOnInit() {
    this.getWorkerList(this.selectedJobData._id);

  }

  /**
   * 
   * @param data 
   * @description gftfgjfdy
   */
  getWorkerList(data: any) {

    if (data != '0') {
      this.nodataFoundMsg = '';
      let datePipe = new DatePipe('en-us')
      this.httpcall.sendHttpCall('', `/api/assignJobs/getAllWorkerByJobId/${data}`, 'get').subscribe((success) => {
        this.workers = success;

        

        if (success.length == 0){
          var data = [];
          this.source.load(data);
        }else{

        let data = [];

        var prmoise = new Promise((resolve, reject) => {
          success.forEach(element => {
            element.establish = datePipe.transform(element.establish, 'yyyy-MM-dd');
            data.push(element.workerId);
            resolve();
          });
        }).then(() => {
          this.source.load(data);
          // console.log(data);

        })
        }
      });
    } else {
      this.nodataFoundMsg = "Plese Select a Company."
      const toastRef: NbToastRef = this.toastrService.warning(this.nodataFoundMsg, 'Success', { duration: 3000 });
    }

  }


  assignJobToWorkers() {
    this.shareService.setdata(this.selectedJobData).then(() => {
      this.router.navigate(['/pages/job/import-worker']);
    })
  }

  removeFromAssignJobList(item) {
    
    if (window.confirm('Are you sure you want to delete?')) {
      var body = {
        'jobId': this.selectedJobData._id,
        'workerId': item._id,
      }
  
      this.httpcall.sendHttpCall(body, `/api/assignJobs/deleteAssignJobByWorkerAndJobId`, 'put')
        .subscribe((success) => {
          const toastRef: NbToastRef = this.toastrService.danger("Workers Remove From Job List Successfully", 'Success', { duration: 3000 });
          this.getWorkerList(this.selectedJobData._id);
  
        });
      
    } else {
      return;
    }

  }


}
