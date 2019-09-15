import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalservice/http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from '../../../globalservice/share.service';
import { AddsubserviceComponent } from '../modal/addsubservice.component';
import { EditsubserviceComponent } from '../modal/editsubservice.component';
import { NbToastRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-subservice',
  templateUrl: './subservice.component.html',
  styleUrls: ['./subservice.component.scss']
})
export class SubserviceComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      en: {
        title: 'Sub Service name (en)',
        type: 'string',
      },
      su: {
        title: 'Sub Service name (su)',
        type: 'string',
      },

    },
    mode: 'external',
  };
  subservices: any[] = [];
  source: LocalDataSource = new LocalDataSource();

  constructor(private httpcall: HttpService,private toastrService:NbToastrService, private modalService: NgbModal, private shareservice: ShareService) { }

  ngOnInit() {
    this.getSubServices();
  }

  getSubServices() {
    this.httpcall.sendHttpCall('', '/api/servicemains/sub-service/all', 'get').subscribe((res) => {
      res = res || [];
      console.log(res);
      
      res.forEach(element => {
        let obj = {
          _id: element._id,
          serviceId: element.serviceId._id,
          en: element.title.en,
          su: element.title.su,
          icon: element.icon,
          status: element.status,
          createdBy: element.createdBy,
          updatedBy: element.updatedBy,
        }
        this.subservices.push(obj)
        this.source.load(this.subservices)
      });

    }, (err) => {
      console.log(err);

    })
  }

  openaddmodal() {
    this.modalService.open(AddsubserviceComponent, {}).result.then((res) => {
      // make the subservices (global array ) blank because if we not blank this array then it will return the previous array and concatinate the new array with the privious one
      this.subservices = [];
      this.getSubServices();
    }, (err) => {
      console.log((err));

    })

    let user_data = JSON.parse(localStorage.getItem('user_data'));
    console.log(user_data.roleId);
  }

  edit(e) {
    console.log(e);
    this.shareservice.setdata(e).then((res) => {
      console.log(res,'rtrtrtr');
      
      this.modalService.open(EditsubserviceComponent, {}).result.then((res) => {
        console.log(res,'sssssss');
        this.subservices = [];
        this.getSubServices();
      }, (err) => {
        console.log(err);

      })

    }, (err) => {
      console.log(err);

    })

  }

  delete(e) {
    console.log(e);
    if (confirm("Are you sure want to delete this data?")) {
      if (e) {
        let id = e.data._id;
        this.httpcall.sendHttpCall('', `/api/servicemains/sub-service/${id}`, 'delete').subscribe((res) => {
          
          const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
          this.subservices = [];
          this.getSubServices();
        }, (err) => {
          console.log(err);

        })

      }
    }

  }

}
