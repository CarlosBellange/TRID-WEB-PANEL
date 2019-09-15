import { Injectable, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ShareService {
    data: any;
    constructor() {

    }
    setdata(data) :Promise<any> {
      return  new Promise((resolve, reject) => {
            this.data = data;
            resolve('done');
        })
    }
    getdata() {
       return this.data;
    }
}
