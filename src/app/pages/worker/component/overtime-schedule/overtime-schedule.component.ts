import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-overtime-schedule',
  templateUrl: './overtime-schedule.component.html',
  styleUrls: ['./overtime-schedule.component.scss']
})
export class OvertimeScheduleComponent implements OnInit {  

  startTime: any = '12:00';
  endTime: any = '12:00';
  calendar: any = [];
  workingHour: string;

  overtimeRate1: any;
  overtimeRate2: any;
  overtimeRate3: any;
  overtimeRate4: any;

  startTime1: any = '12:00';
  startTime2: any = '12:00';
  startTime3: any = '12:00';
  startTime4: any = '12:00';

  endTime1: any = '12:00';
  endTime2: any = '12:00';
  endTime3: any = '12:00';
  endTime4: any = '12:00';

  workingHour1: string;
  workingHour2: string;
  workingHour3: string;
  workingHour4: string;

  regularPrice1: number = 0;
  regularPrice2: number = 0;
  regularPrice3: number = 0;
  regularPrice4: number = 0;

  overtimeArr = [];
  overtimeObj = {};
  overTimeFullMonth: string = 'no';
  overTimeSchedule: any;

  @Input() data: any;
  @Input() overtimeScheduleBody: any;
  @Input() viewButton: boolean;
  @Output() overtimeWiseData = new EventEmitter();

  constructor(
    private atp: AmazingTimePickerService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit() {

    var value = "";
    if (typeof(this.overtimeScheduleBody) != "undefined"){

    const index = this.overtimeScheduleBody.findIndex(body=> body.month === this.data.month);
if (index >-1) {
    value= this.overtimeScheduleBody[index];
    }
  }

    this.overTimeSchedule = value;
     //  //  //  // console.log(    this.overTimeSchedule);


    let curr = new Date 
    let week = []

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i 
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
      week.push(day)
    }

    this.overtimeObj = {
      'overTimeData' : this.overtimeArr,
      'overtTimeForFullMonth' : this.overTimeFullMonth
    }

   }

   ngAfterViewInit(){
    if(this.overTimeSchedule === ""){
    
    }else{
    
       //  //  //  // console.log(    this.overTimeSchedule);
    this.overtimeRate1 = this.overTimeSchedule.overtimeRate1;
    this.workingHour1 = this.overTimeSchedule.workingHour1;
    this.regularPrice1 = this.overTimeSchedule.regularPrice1;
    
    this.overtimeRate2 = this.overTimeSchedule.overtimeRate2;
    this.workingHour2 = this.overTimeSchedule.workingHour2;
    this.regularPrice2 = this.overTimeSchedule.regularPrice2;
    
    this.overtimeRate3 = this.overTimeSchedule.overtimeRate3;
    this.workingHour3 = this.overTimeSchedule.workingHour3;
    this.regularPrice3 = this.overTimeSchedule.regularPrice3;
    
    this.overtimeRate4 = this.overTimeSchedule.overtimeRate4;
    this.workingHour4 = this.overTimeSchedule.workingHour4;
    this.regularPrice4 = this.overTimeSchedule.regularPrice4;
    
    }
  }

  changeRegularPrice(index){

    var regularPrice = 0;

    if(index == 1)
      regularPrice = this.regularPrice1;
    else if (index == 2)
      regularPrice = this.regularPrice2;
    else if (index == 3)
      regularPrice == this.regularPrice3;
    else 
      regularPrice = this.regularPrice4;

    this.calendar.map(o=>{
      o.price = regularPrice;
    })
    
  }

  saveOvertimeData() {

    this.overtimeArr = [];

    var overtimeData = {
      'overtimeRate1' : this.overtimeRate1,
      // 'startTime1' : this.startTime1,
      // 'endTime1' : this.endTime1,
      'workingHour1' : this.workingHour1,
      'regularPrice1' : this.regularPrice1,
      'overtimeRate2' : this.overtimeRate2,
      // 'startTime2' : this.startTime2,
      // 'endTime2' : this.endTime2,
      'workingHour2' : this.workingHour2,
      'regularPrice2' : this.regularPrice2,
      'overtimeRate3' : this.overtimeRate3,
      // 'startTime3' : this.startTime3,
      // 'endTime3' : this.endTime3,
      'workingHour3' : this.workingHour3,
      'regularPrice3' : this.regularPrice3,
      'overtimeRate4' : this.overtimeRate4,
      // 'startTime4' : this.startTime4,
      // 'endTime4' : this.endTime4,
      'workingHour4' : this.workingHour4,
      'regularPrice4' : this.regularPrice4
    };

    

    this.overtimeWiseData.emit(overtimeData);
    
  }

}
