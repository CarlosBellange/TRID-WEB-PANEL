import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbToastrService, NbToastRef } from '@nebular/theme';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from '../../../globalservice/share.service';
import { HttpService } from '../../../globalservice/http.service';

@Component({
  selector: 'ngx-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss']
})
export class AddserviceComponent implements OnInit {

  AddService: FormGroup
  taxes: any[] = [];

  constructor(private shareservice: ShareService, public activeModal: NgbActiveModal, public formservice: GlobalformService, private toastrService: NbToastrService, private httpcall: HttpService,

  ) {
    this.AddService = new FormGroup({
      'tax_id': new FormControl('', [Validators.required]),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required]),
      'icon': new FormControl(null, [Validators.required]),
      'isSub': new FormControl(null, []),
    })
  }

  ngOnInit() {
    this.getTaxes();
  }


  // get all taxes here
  getTaxes() {
    this.httpcall.sendHttpCall('', '/api/taxes/all', 'get').subscribe((res) => {

      res.forEach(element => {
        let obj = {
          _id: element._id,
          en: element.name.en,
          su: element.name.su
        }
        this.taxes.push(obj);
      });
    }, (err) => {
      console.log(err);
    })
  }

  addService() {
    let user_data = JSON.parse(localStorage.getItem('user_data'));
    var roleId = user_data.roleId;

    console.log(this.AddService.value)
    if (this.AddService.value) {
      let body = {
        name: {
          en: this.AddService.value.en,
          su: this.AddService.value.su,
        },
        taxes: this.AddService.value.tax_id,
        icon: this.AddService.value.icon,
        createdBy: roleId,
        updatedBy: roleId,
        isSub: this.AddService.value.isSub,
        status: true,
      }

      this.httpcall.sendHttpCall(body, '/api/servicemains/', 'post').subscribe((res) => {
        this.activeModal.close();

      }, (err) => {
        console.log(err);

      })
    } else {
      this.formservice.validateAllFormFields(this.AddService);
    }

  }



}
