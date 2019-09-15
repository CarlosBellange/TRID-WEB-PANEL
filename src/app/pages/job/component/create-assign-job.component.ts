import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateJobComponent } from '../modal/create-job.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../globalservice/http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ShareService } from '../../../globalservice/share.service';
import { EditJobComponent } from '../modal/edit-job.component';
import { DatePipe } from '@angular/common';
import { NbToastRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-create-assign-job',
  templateUrl: './create-assign-job.component.html',
  styleUrls: ['./create-assign-job.component.scss']
})
export class CreateAssignJobComponent implements OnInit {

  jobs: any[] = [];
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
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'Job ID',
        type: 'number',
      },
      jobName: {
        title: 'Job Name',
        type: 'string',
      },
      category: {
        title: 'Category',
        type: 'string',
      },
      subCategory: {
        title: 'SubCategory',
        type: 'string',
      },
      name: {
        title: 'Customer',
        type: 'string',
      },
      scheduleDateTime: {
        title: 'Scheduled Date/Time',
        type: 'string',
      },
      action: {
        title: 'Action',
        type: 'string',
      },
    },
    mode: 'external',
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private httpcall: HttpService,
    private shareService:ShareService,
    private toastrService: NbToastrService,
    ) { }

  ngOnInit() {
    this.getAllJobs();
  }

  getAllJobs() {

    let datePipe = new DatePipe('en-us')
    this.httpcall.sendHttpCall('', '/api/jobs/allJobs', 'get').subscribe((success) => {
      // res.forEach(element => {
        // console.log(element);
        // let obj = {
        //   Category: element.category.name.en,
        //   id: element._id,
        //   // SubCategory: this.getJobSubCategoryByJobId(element.subCategory),
        //   SubCategory: element.subCategory.name.en,
        // }
        // this.jobs.push(obj);
        // this.source.load(this.jobs)

        
      // });

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

    }, (err) => {
      console.log(err);

    })
  }

  assignJob(item){
    this.shareService.setdata(item.data).then(() => {
      this.router.navigate(['/pages/job/assign-Job']);
    });
  }

  openAssignJob() {

    this.modalService.open(CreateJobComponent, {}).result.then((res) => {
      
    })
  }

  getJobCategoryNameById(id){
    console.log(id);
  }

  getJobSubCategoryByJobId(e){
    console.log(e);
    
    this.httpcall.sendHttpCall('', `/api/jobs/getSubcategoryByCategoryId/${e}`, 'get').subscribe((res) => {
      
      console.log(res);
      
      return res.element.name.en;
      
    }, (err) => {
      console.log(err);
    })
  }

  edit(item){
    this.shareService.setdata(item).then((res) => {
      const emd = this.modalService.open(EditJobComponent, {}).result.then((res) => {
        // this.city = [];
        // this.getAllCities();
      }, (err) => {

      })
    }, (err) => {

    })
  }

  delete(e) {
    // this.city = [];
    let id = e.data._id;
    console.log(id);
    if (confirm("Are you sure want to delete this city?")) {

      this.httpcall.sendHttpCall('', `/api/jobs/deleteJob/${id}`, 'put').subscribe((res) => {
        const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });

        this.getAllJobs();
      }, (err) => {
        console.log(err);
        const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Error', { duration: 3000 });

      })
    }
  }
}
