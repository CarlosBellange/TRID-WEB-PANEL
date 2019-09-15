import { Component, OnInit } from '@angular/core';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { HttpService } from '../../../globalservice/http.service';
import { DatePipe } from '@angular/common';
import { ShareService } from '../../../globalservice/share.service';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Component({
  selector: 'ngx-workerlist',
  templateUrl: './workerlist.component.html',
  styleUrls: ['./workerlist.component.scss']
})
export class WorkerlistComponent implements OnInit {
  workers:any;
  companyId: any;
  settings = {
    add: {
      addButtonContent: '<i></i>',
      createButtonContent: '<i></i>',
      cancelButtonContent: '<i></i>',
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
  isEnable: boolean = false;
  data = [];
  companyList: any;
  nodataFoundMsg: String = '';

  constructor(private globalSevice: GlobalformService,
    private router: Router,
    private httpcall: HttpService,
    private shareService: ShareService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.httpcall.sendHttpCall('','/api/companyProfiles/all','get').subscribe((success:any)=>{
      // console.log(success);
     
      this.companyList = success;
    })

    
  }

  onDeleteConfirm(event): void {
    // console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {
      
      let id = event.data._id;
      this.httpcall.sendHttpCall('', `/api/workersProfiles/deleteWorkersProfile/${id}`, 'put').subscribe((res) => {
        const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
        // event.confirm.resolve();
        this.getWorkerList(this.companyId);
      }, (err) => {
        // console.log(err);
        const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Success', { duration: 3000 });
        event.confirm.reject();
      })
    } else {
      event.confirm.reject();
    }
  }
  /**
   * @description to open add worker modal
   */
  openAddWorkerModal() {
    //  this.modalService.open(AddCompanyComponent, {}).result.then((res) => {
    //   //this.getChildMenuList();
    // })
    // console.log('sjfgyschdscyvsycscb');

    this.router.navigate(['/pages/worker/addWorker']);

  }

  editModel(event) {
    this.shareService.setdata(event.data).then(() => {
      this.router.navigate(['/pages/worker/edit']);
    })
  }

  onUserRowSelect(item: any) {
    // console.log(item);
    this.shareService.setdata(item.data).then(() => {
      this.router.navigate(['/pages/worker/details']);
    })
  }

  /**
   * 
   * @param data 
   * @description to get worker list according to copany id
   */
  getWorkerList(data:any){
    
    if(data != '0') {
      this.companyId = data;
      console.log(this.companyId);
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

}
