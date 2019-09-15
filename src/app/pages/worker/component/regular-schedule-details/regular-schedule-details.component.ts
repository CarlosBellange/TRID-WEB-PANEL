import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NbCalendarRange, NbDateService } from '@nebular/theme';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { __values } from 'tslib';
import { RenderDayCellEventArgs } from '@syncfusion/ej2-calendars';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-regular-schedule-details',
  templateUrl: './regular-schedule-details.component.html',
  styleUrls: ['./regular-schedule-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegularScheduleDetailsComponent implements OnInit {

  // public dateValues: Date[] = [new Date('9/8/2020'), new Date('9/14/2020'), new Date('1/3/2020'), new Date('1/25/2020')];
  

  @ViewChild('item') accordion;

  sTime: any = '12:00';
  eTime: any = '12:00';
  calendar: any = [];
  fullYear: any = [];
  regularScheduleFullMonth: any;
  selectedOffDays: any = [];
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
  // public dateValues: Date[] = [new Date('1/1/2020'), new Date('1/15/2020'), new Date('1/4/2020'), new Date('1/25/2020')];
  public multiSelect: Boolean = true;
  allow: boolean = false;
  // public dateValues: Date[];
  regularSchedule: any;


  @Input() data: any;
  @Input() regularScheduleBody: any;
  
  constructor(
    protected dateService: NbDateService<Date>,
    private atp: AmazingTimePickerService,
  ) {

    
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
    
  }

  ngAfterViewInit(){
    
    if(typeof( this.regularSchedule ) != "undefined"){
    
    var workingData = [];  
    this.regularSchedule.workingDays.forEach(element => {
      var workingDate = new Date(element);
      workingData.push(workingDate);
    });
    this.selectedWorkingDays = workingData; 
    
    var offData = [];
    this.regularSchedule.offDays.forEach(element => {
      var offDate = new Date(element);
      offData.push(offDate);
    });
    this.selectedOffDays = offData;
    
    var particularData = [];
    this.regularSchedule.patricularDays.forEach(element => {
      var particularDate = new Date(element);
      particularData.push(particularDate);
    });
    this.selectedParticularDays = particularData;

    this.sTime = this.regularSchedule.startTime;
    this.eTime = this.regularSchedule.endTime;
    this.internalVat = this.regularSchedule.internalVat;
    this.externalVat = this.regularSchedule.externalVat;
    this.customerVat = this.regularSchedule.customerVat;
    }

  }

  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }






}
