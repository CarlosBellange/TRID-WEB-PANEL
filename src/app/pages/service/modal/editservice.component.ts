import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../globalservice/http.service';
import { ShareService } from '../../../globalservice/share.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-editservice',
  templateUrl: './editservice.component.html',
  styleUrls: ['./editservice.component.scss']
})
export class EditserviceComponent implements OnInit {

  EditService: FormGroup
  taxes: any[] = [];
  service_data: any;

  id = this.shareservice.getdata().data._id;
  constructor(private httpcall: HttpService, private shareservice: ShareService, public activeModal: NgbActiveModal, public formservice: GlobalformService, private toastrService: NbToastrService) {
    this.EditService = new FormGroup({
      'tax_id': new FormControl('', [Validators.required]),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required]),
      'icon': new FormControl('', [Validators.required]),
      'isSub': new FormControl(null, []),
    })
  }

  ngOnInit() {
    this.getTaxes();

    this.service_data = this.shareservice.getdata().data;
    console.log(this.service_data, 'service data');

    this.EditService.setValue({
      tax_id: this.service_data.taxes,
      en: this.service_data.en,
      su: this.service_data.su,
      icon: this.service_data.icon,
      isSub: this.service_data.isSub,
      
    })

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

  editService() {
    

    let user_data = JSON.parse(localStorage.getItem('user_data'));
    var roleId = user_data.roleId;
    let id = this.id;

    console.log(id, 'rrrrrrrrrrrrr');

    if (this.EditService.value) {
      // let id = th
      let body = {
        name: {
          en: this.EditService.value.en,
          su: this.EditService.value.su,
        },
        taxes: this.EditService.value.tax_id,
        icon: this.EditService.value.icon,
        createdBy: roleId,
        updatedBy: roleId,
        isSub: this.EditService.value.isSub,
        status: true,
      }

      this.httpcall.sendHttpCall(body, `/api/servicemains/${id}`, 'put').subscribe((res) => {
        console.log(res);
        this.activeModal.close();
        
      }, (err) => {

      })

      console.log(body);

    }
  }

}
