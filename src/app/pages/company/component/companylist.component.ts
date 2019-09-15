import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';
import { HttpService } from '../../../globalservice/http.service';
import { DatePipe } from '@angular/common';
import { ShareService } from '../../../globalservice/share.service';

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
  isEnable: boolean = false;
  data = [];

  constructor(private globalSevice: GlobalformService,
    private modalService: NgbModal,
    private router: Router,
    private httpCall: HttpService,
    private shareService:ShareService) { }

  ngOnInit() {
    let datePipe = new DatePipe('en-us')
    this.httpCall.sendHttpCall('', '/api/companyProfiles/all', 'get').subscribe((success) => {
      console.log(success);

      let data = [];
      success.forEach(element => {
        element.establish = datePipe.transform(element.establish, 'yyyy-MM-dd');
        data.push(element)

      });
      this.source.load(data)
    })

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  /**
   * @description to open add company modal
   */
  openAddCompanyModal() {
    this.shareService.setdata(null).then(()=>{
      this.router.navigate(['/pages/company/addCompany'])
    })
   // this.router.navigate(['/pages/company/addCompany'])

  }

  edit(item: any) {
    console.log(item.data);
    this.shareService.setdata(item.data).then(()=>{
      this.router.navigate(['/pages/company/editCompany'])
    })

  }

  // edit() {
  //   this.shareService.setdata(null).then(()=>{
  //     this.router.navigate(['/pages/company/editCompany'])
  //   })

  //}

  
  onUserRowSelect(item:any){
    console.log(item);
    this.shareService.setdata(item.data).then(()=>{
      this.router.navigate(['/pages/company/details'])  
    })
  }
}
