import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../globalservice/http.service';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from '../../../globalservice/share.service';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-editsubservice',
  templateUrl: './editsubservice.component.html',
  styleUrls: ['./editsubservice.component.scss']
})
export class EditsubserviceComponent implements OnInit {

  EditSubService: FormGroup
  source: LocalDataSource = new LocalDataSource();
  subservice_data : any;
  services: any[] = [];
  id = this.shareservice.getdata().data._id;

  constructor(private shareservice: ShareService,private toastrService:NbToastrService,  public activeModal: NgbActiveModal, public formservice: GlobalformService, private httpcall: HttpService) { 
    this.EditSubService = new FormGroup({
      'serviceId': new FormControl('', [Validators.required]),
      'icon': new FormControl(null, []),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required])
    })
  }

  ngOnInit() {
    this.getServiceList();
    this.subservice_data = this.shareservice.getdata().data;

    this.EditSubService.setValue({
      serviceId: this.subservice_data.serviceId,
      en: this.subservice_data.en,
      su: this.subservice_data.su,
      icon: '',
      
    })
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

  editSubService(){
        console.log('EditSubService',this.EditSubService.value);
        let user_data = JSON.parse(localStorage.getItem('user_data'));
        var roleId = user_data.roleId;

        let id = this.id;        

        if (this.EditSubService.value) {
          let body = {
          title: {
            en: this.EditSubService.value.en,
            su: this.EditSubService.value.su
          },
          icon: this.EditSubService.value.icon,
          serviceId: this.EditSubService.value.serviceId,
          createdBy: roleId,
          updatedBy: roleId,
          status: true
        }

          this.httpcall.sendHttpCall(body,`/api/servicemains/sub-service/${id}`,'put').subscribe((res)=>{
            console.log(res.message,'sssssss');
            const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
            this.activeModal.close();
          },err=>console.log(err));
        }
    
  }

}
