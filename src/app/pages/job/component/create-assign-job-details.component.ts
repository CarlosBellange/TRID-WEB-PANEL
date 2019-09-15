import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'ngx-create-assign-job-details',
  templateUrl: './create-assign-job-details.component.html',
  styleUrls: ['./create-assign-job-details.component.scss']
})
export class CreateAssignJobDetailsComponent implements OnInit {

  @ViewChild('newCustomer') accordion;

  addNewCustomer: FormGroup;
  min: Date;
  max: Date;
  time:any;

  constructor(private atp: AmazingTimePickerService) {

    this.addNewCustomer = new FormGroup({
      'CustomerType': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'PhoneNumber': new FormControl('', [Validators.required]),
      'address': new FormControl('', [Validators.required]),
      'serviceType': new FormControl('', [Validators.required]),
      'subserviceType': new FormControl('', [Validators.required]),
      'JobDescription': new FormControl('', [Validators.required]),
      'Time':new FormControl('', [Validators.required]),
    });
   }

  ngOnInit() {
  }

  openNewCustomer() {
    this.accordion.toggle();
  }


  AddNewCustomer() {
    
  }
  openTime() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.time = time;
    });
  }

}
