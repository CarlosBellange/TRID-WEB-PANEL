import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../globalservice/share.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddserviceComponent } from '../modal/addservice.component';
import { EditserviceComponent } from '../modal/editservice.component';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Component({
  selector: 'ngx-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {

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
        title: 'Service name (en)',
        type: 'string',
      },
      su: {
        title: 'Service name (su)',
        type: 'string',
      },

    },
    mode: 'external',
  };
  // data: any[] = [];
  services: any[] = [];
  taxes: any[] = [];
  source: LocalDataSource = new LocalDataSource();
  isEnable: boolean = false;

  constructor(private httpcall: HttpService, private modalService: NgbModal, public router: Router, private shareservice: ShareService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getServiceList();
  }


  getServiceList() {
    this.httpcall.sendHttpCall('', '/api/servicemains/all', 'get').subscribe((res) => {

      console.log('all services: ', res);
      res = res || [];

      res.forEach(element => {
        let obj = {
          taxes: element.taxes,
          en: element.name.en,
          su: element.name.su,
          _id: element._id,
          icon: element.icon,
          isSub: element.isSub,
          createdBy: element.createdBy,
        }
        this.services.push(obj);
      });

      this.source.load(this.services)

    }, (err) => {
      console.log(err);

    })
  }

  openaddmodal() {
    const md = this.modalService.open(AddserviceComponent, {}).result.then((res) => {
      this.getServiceList();

    }, (err) => {
      console.log(err);
    });

    let user_data = JSON.parse(localStorage.getItem('user_data'));
    console.log(user_data.roleId);
  }

  edit(e) {
    console.log('edit', e);
    this.shareservice.setdata(e).then((res) => {
      this.modalService.open(EditserviceComponent, {}).result.then((res) => {
        
        this.services = [];
        this.getServiceList();
      }, (err) => {
        console.log(err);
      })

    }, (err) => {

    })


  }

  delete(e) {
    console.log('delete', e);
    if (confirm("Are you sure want to delete this data?")) {
      let id = e.data._id;
      this.httpcall.sendHttpCall('', `/api/servicemains/${id}`, 'delete').subscribe((res) => {
        this.services = [];
        this.getServiceList();
      }, (err) => {
        console.log(err);
      })
    }
  }
}
