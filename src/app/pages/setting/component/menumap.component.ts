import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalservice/http.service';
import { Imenu } from '../../menu/model/menu.model';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NbToastrService, NbToastRef } from '@nebular/theme';

@Component({
  selector: 'ngx-menumap',
  templateUrl: './menumap.component.html',
  styleUrls: ['./menumap.component.scss']
})
export class MenumapComponent implements OnInit {

  data: any[] = [];
  roles: any[] = [];
  menus: any[] = [];
  roleID: any;
  AddMenuToRole: FormGroup


  source: LocalDataSource = new LocalDataSource();

  constructor(private httpcall: HttpService, public formservice: GlobalformService, private toastrService: NbToastrService) {
    this.AddMenuToRole = new FormGroup({
      'roleID': new FormControl('', [Validators.required]),
      'menuID': new FormControl('', [Validators.required])

    })
  }

  ngOnInit() {
    this.getMenuLIst();
    this.getRoles();
  }

  getMenuLIst() {
    this.httpcall.sendHttpCall('', '/api/menus/all', 'get').subscribe((res: Imenu[]) => {
      this.menus = res;
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }

  getRoles() {

    this.httpcall.sendHttpCall('', '/api/roles/all', 'get').subscribe((res) => {

      res = res || [];
      console.log('name', res);
      res.forEach(element => {
        let obj = {
          en: element.name.en,
          su: element.name.su,
          _id: element._id
        }
        this.roles.push(obj);
      });


    }, (err) => {
      console.log(err);

    })


  }

  roleWiseMenu(e?, rid?) {
    if (e) {
      this.roleID = e.target.value;
      var body = {
        roleID: e.target.value
      }
    }
    if (rid) {
      this.roleID = rid;
      var body = {
        roleID: rid
      }
    }



    this.httpcall.sendHttpCall(body, '/api/menus/roleWiseMenu', 'post').subscribe((res) => {
      console.log(res);
      res = res || [];
      this.data = res;
    }, (err) => {
      console.log(err);
    })


  }

  addMenuToRole() {
    let body = {
      roleID: this.AddMenuToRole.value.roleID,
      menuID: this.AddMenuToRole.value.menuID,
    }
    this.httpcall.sendHttpCall(body, '/api/menus/menuMap', 'post').subscribe((res) => {
      const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });

    }, (err) => {
      const toastRef: NbToastRef = this.toastrService.danger(err.error, 'Error', { duration: 3000 });

    })

  }

  deleteMenuFromRole(e) {
    let body = {
      roleID: this.roleID,
      menuID: e._id
    }
    this.httpcall.sendHttpCall(body, '/api/menus/menuMap/removeMenu', 'post').subscribe((res) => {

      const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
      this.roleWiseMenu(null, this.roleID)
    }, (err) => {
      console.log(err);
      const toastRef: NbToastRef = this.toastrService.danger(err.error, 'Error', { duration: 3000 });
    })


  }



}
