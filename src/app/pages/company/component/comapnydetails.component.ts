import { Component, OnInit, ɵConsole } from '@angular/core';
import { ShareService } from '../../../globalservice/share.service';
import { Router } from '@angular/router';
import { HttpService } from '../../../globalservice/http.service';
import { NbToastRef,NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-comapnydetails',
  templateUrl: './comapnydetails.component.html',
  styleUrls: ['./comapnydetails.component.scss']
})
export class ComapnydetailsComponent implements OnInit {

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
      Customer: {
        title: 'Customer',
        type: 'string',
      },
      ScheduleDate: {
        title: 'Schedule Date',
        type: 'string',
      },
      Taxation: {
        title: 'Taxation',
        type: 'string',
      },
      Action: {
        title: 'Action',
        type: 'string',
      },
    },
  };

  companyDetails: any;
  constructor(
    private shareService: ShareService,
    private router: Router,
    private httpcall: HttpService,
    public toastrService: NbToastrService
    ) { 
      this.companyDetails = this.shareService.getdata();
      console.log(this.companyDetails);
    }

  ngOnInit() {
  }

  edit(item: any){

    this.shareService.setdata(item).then(()=>{
      this.router.navigate(['/pages/company/editCompany'])
    })
  }

  login(item: any){
      
      let body = {
        email: item.email,
        password: item.password
      }
      this.httpcall.sendHttpCall(JSON.stringify(body), '/api/users/login', 'post').subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem("user_data", JSON.stringify(res));
          this.router.navigate(['./pages/iot-dashboard']);

          this.router.navigate([]).then(result => {
            localStorage.setItem("user_data", JSON.stringify(res));
            window.open("./pages/iot-dashboard","_blank");
          });
        }
        const toastRef: NbToastRef = this.toastrService.success('Logged in successfully!', 'Success', { duration: 3000 });

      }, (err) => {
        console.log(err.error);
        if (err.error.email) {
          const toastRef: NbToastRef = this.toastrService.danger(err.error.email, 'Error', { duration: 3000 });
        } else if (err.error.password) {
          const toastRef: NbToastRef = this.toastrService.danger(err.error.password, 'Error', { duration: 3000 });
        }

      })

  }
}
