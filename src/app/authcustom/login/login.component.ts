/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../globalservice/http.service';
import { GlobalformService } from '../../globalservice/globalform.service';
import { NbToastRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements AfterViewInit {

  Login: FormGroup;
  userData: any;

  constructor(service: NbAuthService,
    cd: ChangeDetectorRef,
    public router: Router,
    private httpcall: HttpService,
    public formservice: GlobalformService,
    public toastrService: NbToastrService) {
    
      let data = JSON.parse(localStorage.getItem("user_data")?localStorage.getItem("user_data"):null);
      if(data){
        this.router.navigate(['./pages/iot-dashboard']);
      }
      
    this.Login = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, [Validators.required])
    })
   
  }

  ngAfterViewInit(){
    document.getElementById('email').focus();
  }
  /**
   * 
   * @description login 
   */
  login() {
    if (this.Login.valid) {
      //mainlogic
      console.log(this.Login.value);
      let body = {
        email: this.Login.value.email,
        password: this.Login.value.password
      }
      this.httpcall.sendHttpCall(JSON.stringify(body), '/api/users/login', 'post').subscribe((res: any) => {

        if (res.success) {
          this.getUserRoleById(res);
          this.router.navigate(['./pages/iot-dashboard']);
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

    } else {
      this.formservice.validateAllFormFields(this.Login);
    }
  }

  getUserRoleById(item){
    // console.log(item);
    
    this.httpcall.sendHttpCall('', `/api/roles/getRoleNameById/${item.roleId}`, 'get').subscribe((res) => {
      
      item['roleName'] = res.name['en'];
      localStorage.setItem("user_data", JSON.stringify(item));
      
    }, (err) => {
      console.log(err);
    })
  }
}
