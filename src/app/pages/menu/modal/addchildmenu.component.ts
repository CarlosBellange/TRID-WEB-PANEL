import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalservice/http.service';
import { Imenu } from '../model/menu.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NbToastRef, NbToastrService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'ngx-addchildmenu',
  templateUrl: './addchildmenu.component.html',
  styleUrls: ['./addchildmenu.component.scss']
})
export class AddchildmenuComponent implements OnInit {

  AddChildMenu: FormGroup
  parent_datas: Imenu[] = [];

  constructor(private httpcall: HttpService, private toastrService: NbToastrService, public activeModal: NgbActiveModal, public formservice: GlobalformService) {
    this.AddChildMenu = new FormGroup({
      'parentId': new FormControl('', [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'link': new FormControl(null, [Validators.required]),
      'icon': new FormControl(null, [Validators.required])
    })


  }

  ngOnInit() {
    this.getParentMenuData();

  }


  getParentMenuData() {
    this.httpcall.sendHttpCall('', '/api/menus/all', 'get').subscribe((res: Imenu[]) => {
      console.log(res);
      this.parent_datas = res;

    }, (err) => {
      console.log(err);
    })
  }

  addChileMenu() {
    console.log(this.AddChildMenu.value);

    if (this.AddChildMenu.valid) {
      console.log(this.AddChildMenu.value);
      let body = {
        parentId: this.AddChildMenu.value.parentId,
        title: this.AddChildMenu.value.title,
        link: this.AddChildMenu.value.link,
        icon: this.AddChildMenu.value.icon,
        isParent: 'false',
        isChild: 'true',
      }
      this.httpcall.sendHttpCall(body, '/api/menus/childmenu', 'post').subscribe((res: any) => {
        this.activeModal.close();
        // const toastRef: NbToastRef = this.toastrService.success(res.message,'Success',{duration:3000});
      }, (err) => {
        console.log(err);

      })

    } else {
      this.formservice.validateAllFormFields(this.AddChildMenu);
    }


  }
  getval(e) {

    console.log(e.target.val);

  }

}
