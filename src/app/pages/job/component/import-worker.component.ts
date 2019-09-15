import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../globalservice/share.service';
import { NbToastrService, NbToastRef } from '@nebular/theme';
import { DatePipe } from '@angular/common';
import { resolve } from 'url';

@Component({
  selector: 'ngx-import-worker',
  templateUrl: './import-worker.component.html',
  styleUrls: ['./import-worker.component.scss']
})
export class ImportWorkerComponent implements OnInit {

  jobs: any[] = [];
  settings = {
    // add: {
    //   addButtonContent: '<i></i>',
    //   createButtonContent: '<i></i>',
    //   cancelButtonContent: '<i></i>',
    //   confirmCreate: false,
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
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
  workers:any;
  selectedWorkers: any = null;
  jobData: any;
  companyId: any;
  companyView: boolean;
  assignWorkerView: boolean = false;
  
  constructor(
    private httpcall: HttpService,
    private router: Router,
    private shareService:ShareService,
    private toastrService: NbToastrService,) {

      this.jobData = this.shareService.getdata();

      console.log(this.jobData);
    }

  ngOnInit() {

    this.checkAssignedWorkerList(this.jobData._id);
  }

  checkAssignedWorkerList(data: any) {

    if (data != '0') {
      let datePipe = new DatePipe('en-us')
      this.httpcall.sendHttpCall('', `/api/assignJobs/getNoAssignWorkerByJobId/${data}`, 'get').subscribe((success) => {


        let data = [];

        var prmoise = new Promise((resolve, reject) => {
          success.forEach(element => {
            element.establish = datePipe.transform(element.establish, 'yyyy-MM-dd');
            data.push(element)
            resolve();
          });
        }).then(() => {
          this.source.load(data);
          // console.log(data);

        })
        
          // this.companyView = false;
          // this.getWorkerList(this.jobData.companyId);
        
      });
    } else {
      this.nodataFoundMsg = "Plese Select a Company."
      const toastRef: NbToastRef = this.toastrService.warning(this.nodataFoundMsg, 'Success', { duration: 3000 });
    }

  }

  getAllCompanyList(){
    this.httpcall.sendHttpCall('','/api/companyProfiles/all','get').subscribe((success:any)=>{
      // console.log(success);
     
      this.companyList = success;
    })
  }

  getWorkerList(data:any){
    
    if(data != '0') {
      this.nodataFoundMsg = '';
      let datePipe = new DatePipe('en-us')
      this.httpcall.sendHttpCall('', `/api/workersProfiles/all/${data}`, 'get').subscribe((success) => {
        this.workers = success;

        let data = [];

        var prmoise = new Promise((resolve, reject) => {
          success.forEach(element => {
            element.establish = datePipe.transform(element.establish, 'yyyy-MM-dd');
            data.push(element)
            resolve();
          });
        }).then(() => {
          this.source.load(data);
          // console.log(data);

        })
      });
    } else {
      this.nodataFoundMsg = "Plese Select a Company."
      const toastRef: NbToastRef = this.toastrService.warning(this.nodataFoundMsg, 'Warning', { duration: 3000 });
    }
    
  }

  onUserRowSelect(item){
    
    this.selectedWorkers = item.selected;
    
    if(this.selectedWorkers.length >0){
      this.assignWorkerView = true;
    }else{
      this.assignWorkerView = false;
    }

    console.log(this.selectedWorkers);
  }

  assignWorkers(){

    let body=[];
    
    if(this.selectedWorkers == null){
      const toastRef: NbToastRef = this.toastrService.warning("Select Workers To Assign Job", 'Warning', { duration: 3000 });
    }else{
    this.selectedWorkers.forEach(element => {
      var data = {
      'jobId': this.jobData._id,
      'workerId': element._id,
      'companyId': element.companyId,
      };
      body.push(data);
      
    });
    
    this.httpcall.sendHttpCall(body, `/api/assignJobs/save`, 'post')
      .subscribe((success) => {
        console.log(success);
        
        const toastRef: NbToastRef = this.toastrService.success("Workers Assign Successfully", 'Success', { duration: 3000 });

        this.shareService.setdata(this.jobData).then(() => {
          this.router.navigate(['/pages/job/assign-Job']);
        })
      });

    }
  }

}
