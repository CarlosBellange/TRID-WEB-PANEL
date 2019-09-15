import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { __values } from 'tslib';

@Component({
  selector: 'ngx-regular-schedule',
  templateUrl: './regular-schedule.component.html',
  styleUrls: ['./regular-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegularScheduleComponent implements OnInit {

  @ViewChild('item') accordion;

  sTime: any = '12:00';
  eTime: any = '12:00';
  calendar: any = [];
  fullYear: any = [];
  regularScheduleFullMonth: any;
  selctedOffDays: any = [];
  selectedWorkingDays: any = [];
  selectedParticularDays: any = [];
  regularScheduleObject = {};
  regularPrice: any;
  minDate: any;
  maxDate: any;
  scheduleDayType: any = ['Working Days', 'Off Days', 'Particular Days'];
  schedule: any;
  scheduleDay: any;
  customerVat: any;
  externalVat: any;
  internalVat: any;
  // public dateValues: Date[] = [new Date('1/1/2020'), new Date('1/15/2020'), new Date('1/3/2020'), new Date('1/25/2020')];
  public multiSelect: Boolean = true
  // public dateValues: Date[];
  regularSchedule: any;


  @Input() data: any;
  @Input() regularScheduleBody: any;
  @Output() regularScheduleData = new EventEmitter();
  constructor(
    protected dateService: NbDateService<Date>,
    private atp: AmazingTimePickerService,
  ) {

    // this.scheduleDay = "Working Days";
  }

  ngOnInit() {

    this.minDate = this.data.firstDate;
    this.maxDate = this.data.lastDate;
    
    var value = "";
    if (this.regularScheduleBody === "undefined"){

    }else{
    const index = this.regularScheduleBody.findIndex(body=> body.month === this.data.month);
if (index >-1) {
    value= this.regularScheduleBody[index];
    }
  }
    this.regularSchedule = value;
    // this.regularSchedule);

  }

  ngAfterViewInit(){
    if(typeof( this.regularSchedule ) != "undefined"){
    
    this.selectedWorkingDays = this.regularSchedule.workingDays;
    this.selctedOffDays = this.regularSchedule.offDays;
    this.selectedParticularDays = this.regularSchedule.patricularDays;
    this.sTime = this.regularSchedule.startTime;
    this.eTime = this.regularSchedule.endTime;
    this.internalVat = this.regularSchedule.internalVat;
    this.externalVat = this.regularSchedule.externalVat;
    this.customerVat = this.regularSchedule.customerVat;
    }

    this.scheduleDay = "Working Days";

  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  dateValue(event) {

    // event);

  }

  getSelectedOffDates(item) {
    
    this.selctedOffDays = [];
    this.selctedOffDays = item;
    // this.selctedOffDays)
  }

  setRegularScheduleMonth() {
    this.regularScheduleObject = {
      workingDays: this.selectedWorkingDays,
      offDays: this.selctedOffDays,
      patricularDays: this.selectedParticularDays,
      startTime: this.sTime,
      endTime: this.eTime,
      regularPrice: this.regularPrice,
      status: true,
      customerVat: this.customerVat,
      externalVat: this.externalVat,
      internalVat: this.internalVat,
    }

    this.regularScheduleData.emit(this.regularScheduleObject);
    // // body);
  }

  changeRegularPrice(item) {

  }

  getSelectedWorkingDays(item) {

    this.selectedWorkingDays = [];
    this.selectedWorkingDays = item;

  }

  getScheduleDayType(item){
    console.log(item);
    this.scheduleDay = item;
  }

  getSelectedPatricualrDates(item) {

    this.selectedParticularDays = [];
    this.selectedParticularDays = item;

  }

  disabledOffDays(args): void {
    // args);
    var argumentDates = args;
    for (var i = 0; i < this.selectedWorkingDays.length; i++) {

      var workingDate = this.selectedWorkingDays[i];

      if (argumentDates.date.getTime() === workingDate.getTime()) {

        argumentDates.isDisabled = true;
      }
    }

  }

  disabledWorkingDays(args): void {
    var argumentDates = args;
    
    for (var i = 0; i < this.selctedOffDays.length; i++) {

      var offDate = this.selctedOffDays[i];

      if (argumentDates.date.getTime() === offDate.getTime()) {

        argumentDates.isDisabled = true;
        
      }
    }
  }

}
