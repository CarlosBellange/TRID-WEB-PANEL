import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../globalservice/share.service';
import { HttpService } from '../../../globalservice/http.service';
import { Router } from '@angular/router';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { LocalDataSource } from 'ng2-smart-table';
import { DatePipe } from '@angular/common';

var $: any;
@Component({
  selector: 'ngx-add-worker-from-company-list',
  templateUrl: './add-worker-from-company-list.component.html',
  styleUrls: ['./add-worker-from-company-list.component.scss']
})
export class AddWorkerFromCompanyListComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i ></i>',
    },
    edit: {
      editButtonContent: '<i class="fa fa-plus-circle"></i>',
      
    },
    delete: {
      deleteButtonContent: '<i ></i>',
      confirmDelete: true,
    },
    columns: {
      compOrgId: {
        title: 'Org ID',
        type: 'String',
      },
      compName: {
        title: 'company Name',
        type: 'string',
      },
      compAddress: {
        title: 'Address',
        type: 'string',
      },
      compPhoneNumber: {
        title: 'Compay Phone',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      establish: {
        title: 'Establish',
        type: 'date',
      },
    },
    mode: 'external',
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(
    private globalSevice: GlobalformService,
    private router: Router,
    private httpCall: HttpService,
    private shareService:ShareService
  ) { 
    
  }

  ngOnInit() {
    this.getAllCompanyList();
  }

  getAllCompanyList(){
    let datePipe = new DatePipe('en-us')
    this.httpCall.sendHttpCall('', '/api/companyProfiles/all', 'get').subscribe((success) => {
      // console.log(success);

      let data = [];
      success.forEach(element => {
        element.establish = datePipe.transform(element.establish, 'yyyy-MM-dd');
        data.push(element)

      });
      this.source.load(data)
    })

  }

  addWorker(item: any){
    this.shareService.setdata(item.data).then(() => {
      this.router.navigate(['/pages/worker/addWorker']);
    })
  }
  
}
