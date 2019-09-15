import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'ngx-temporary-schedule',
  templateUrl: './temporary-schedule.component.html',
  styleUrls: ['./temporary-schedule.component.scss']
})
export class TemporaryScheduleComponent implements OnInit {

  switch: boolean = false;
  switchMessage: string = "Select Monthly";
  sTime: any = '12:00';
  eTime: any = '12:00';
  calendar: any = [];
  fullYear: any = [];
  regularScheduleFullMonth: any;
  selctedTempDays: any = [];
  regularScheduleObject = {};
  regularPrice: any;
  minDate: any;
  maxDate: any;
  scheduleDayType: any;
  schedule: any;
  customerVat: any;
  externalVat: any;
  internalVat: any;
  // public dateValues: Date[] = [new Date('1/1/2020'), new Date('1/15/2020'), new Date('1/3/2020'), new Date('1/25/2020')];
  public multiSelect: Boolean = true
  // public dateValues: Date[];

  @Input() temporaryScheduleBody: any;
  @Input() viewButton: boolean;
  @Output() temporaryScheduleData = new EventEmitter();
  constructor(
    protected dateService: NbDateService<Date>,
    private atp: AmazingTimePickerService,
  ) {

    var date = new Date();
    this.minDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  ngOnInit() {

    //  //  // console.log(  this.temporaryScheduleBody);
    if (typeof( this.temporaryScheduleBody  ) != "undefined"){

    this.selctedTempDays = this.temporaryScheduleBody.tempDays;
    this.sTime = this.temporaryScheduleBody.startTime;
    this.eTime = this.temporaryScheduleBody.endTime;
    this.internalVat = this.temporaryScheduleBody.internalVat;
    this.externalVat = this.temporaryScheduleBody.externalVat;
    this.customerVat = this.temporaryScheduleBody.customerVat;
    }

  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  dateValue(event) {

    //  //  // console.log(  event);

  }

  getSelectedTempDates(item) {
    // this.selctedTempDays = [];
    this.selctedTempDays = item;
    //  //  // console.log(  this.selctedTempDays);
  }

  setTemporarySchedule() {
    var temporaryScheduleObject = {
      tempDays: this.selctedTempDays,
      startTime: this.sTime,
      endTime: this.eTime,
      status: true,
      customerVat: this.customerVat,
      externalVat: this.externalVat,
      internalVat: this.internalVat,
    }

    this.temporaryScheduleData.emit(temporaryScheduleObject);
    // //  //  // console.log(  body);
  }


  changeRegularPrice(item) {

  }

}
