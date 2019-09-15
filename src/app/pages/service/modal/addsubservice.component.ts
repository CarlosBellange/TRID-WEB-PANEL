import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalservice/http.service';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShareService } from '../../../globalservice/share.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Component({
  selector: 'ngx-addsubservice',
  templateUrl: './addsubservice.component.html',
  styleUrls: ['./addsubservice.component.scss']
})
export class AddsubserviceComponent implements OnInit {

  services: any[] = [];
  source: LocalDataSource = new LocalDataSource();

  AddSubService: FormGroup;


  constructor(private shareservice: ShareService, public activeModal: NgbActiveModal, public formservice: GlobalformService, private toastrService: NbToastrService, private httpcall: HttpService) {
    this.AddSubService = new FormGroup({
      'serviceId': new FormControl('', [Validators.required]),
      'icon': new FormControl(null, []),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required])
    })
  }

  ngOnInit() {
    this.getServiceList();
  }

  getServiceList() {
    this.httpcall.sendHttpCall('', '/api/servicemains/all', 'get').subscribe((res) => {
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

  addsubService() {
    let user_data = JSON.parse(localStorage.getItem('user_data'));
    console.log('roleId', user_data.roleId);
    let roleId = user_data.roleId;

    console.log(this.AddSubService.value);
    if (this.AddSubService.value) {
      let body = {
        title: {
          en: this.AddSubService.value.en,
          su: this.AddSubService.value.su
        },
        icon: this.AddSubService.value.icon,
        serviceId: this.AddSubService.value.serviceId,
        createdBy: roleId,
        updatedBy: roleId,
        status: true
      }
      this.httpcall.sendHttpCall(body, '/api/servicemains/sub-service', 'post').subscribe((res) => {
        console.log('www', res);
        
        const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });

        this.activeModal.close();
      }, (err) => {
        console.log(err);

      })

    }





  }

}
