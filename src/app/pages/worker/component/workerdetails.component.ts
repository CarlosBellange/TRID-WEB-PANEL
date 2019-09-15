import { Component, OnInit } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { ShareService } from '../../../globalservice/share.service';
import { HttpService } from '../../../globalservice/http.service';
import { Timecalendar } from './addworker.component';

@Component({
  selector: 'ngx-workerdetails',
  templateUrl: './workerdetails.component.html',
  styleUrls: ['./workerdetails.component.scss']
})
export class WorkerdetailsComponent implements OnInit {
  commonSelectedItem = '2';
  min: Date;
  max: Date;
  service: any;
  subservices: any;
  fullYear: any = [];
  month: any;
  maxDate: any;
  da: any;
  sTime: any;
  eTime: any;
  regularPrice: Number = 0.00;
  calendar: any = [];
  shortNameOfDayObj = {};
  show: boolean = false;

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  columns: {
    JobId: {
        title: 'Job Id',
        type: 'number',
      },
      JobCategory: {
        title: 'Job Category',
        type: 'string',
      },
      Customer: {
        title: 'Customer',
        type: 'string',
      },
      ScheduleDate: {
        title: 'Schedule Date',
        type: 'string',
      },
      Taxation: {
        title: 'Taxation',
        type: 'string',
      },
      Action: {
        title: 'Action',
        type: 'string',
      },
    },
  };


  setting = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  columns: {
    Date: {
        title: 'Date',
        type: 'number',
      },
      ClockIn: {
        title: 'Clock In',
        type: 'string',
      },
      ClockOut: {
        title: 'Clock Out',
        type: 'string',
      },
      TotalWork: {
        title: 'Total Work',
        type: 'string',
      },
      OvertimeClockIn: {
        title: 'Overtime Clock In',
        type: 'string',
      },
      OvertimeClockOut: {
        title: 'Overtime Clock Out',
        type: 'string',
      },
      OvertimeTotalWork: {
        title: 'Overtime Total Work',
        type: 'string',
      },
    },
  };
  isBooking: boolean = true;
  isSchdule: boolean = false;

  workerDetails: any;
  empType: any;
  

  constructor(
    private shareService: ShareService,
    private httpcall: HttpService,
  ) {
    
//protected dateService: NbDateService<Date>
   // this.min = this.dateService.addDay(this.dateService.today(), -5);
   /// this.max = this.dateService.addDay(this.dateService.today(), 5);

   this.workerDetails = this.shareService.getdata();
   console.log(this.workerDetails);

   this.getEmployeeType(this.workerDetails.employeeType);

   this.getServcieById(this.workerDetails.serviceType);

   this.getSubServciesByServiceId(this.workerDetails.serviceType);

   var mS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dates = new Date();
    var y = dates.getFullYear()
    var m = dates.getMonth();
    this.month = dates.toLocaleString('en-us', { month: 'long' })
    this.da = dates.getDate();
    var dayName = days[dates.getDay()];
    this.maxDate = this.lastday(y, m);
    var j = dates.getDay();

    for (let s = m; s < 12; s++) {
      var firstDay = new Date(y, s, 1)
      var lstDay = new Date(y, s + 1, 0)
      var fd = firstDay.getDate();
      var ld = lstDay.getDate();

      if (s != dates.getMonth()) {
        this.da = fd;
        this.maxDate = ld;
      }

      for (let i = this.da; i <= this.maxDate; i++) {
        var object = new Timecalendar();
        object.date = i;
        object.month = mS[s];
        object.year = dates.getFullYear();
        object.day = days[j > 6 ? j = 0 : j];
        object.startTime = this.sTime;
        object.endTime = this.eTime;
        object.price = this.regularPrice;
        object.regularDate = i + '-' + mS[s] + '-' + dates.getFullYear();

        object['firstDate'] = new Date(y, s, 1);;
        object['lastDate'] = new Date(y, s + 1, 0);;
        this.calendar.push(object);

        j++;
      }
      this.fullYear.push(this.calendar);
      // console.log(this.fullYear);
      this.calendar = [];
    }

   }

  ngOnInit() {

    this.shortNameOfDayObj = {
      'Sunday': 'SUN',
      'Monday': 'MON',
      'Tuesday': 'TUES',
      'Wednesday': 'WED',
      'Thursday': 'THUR',
      'Friday': 'FRI',
      'Saturday': 'SAT'
    };

  }

  /**
   * 
   * @param y year
   * @param m month
   * @description to get the last date of the month of a particular year
   */
  lastday(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }

  selectBooking(){
    this.isBooking = true;
    this.isSchdule = false;
  }
  selectSchedule(){
    this.isBooking = false;
    this.isSchdule = true;
  }

  getServcieById(id){

    this.httpcall.sendHttpCall('', `/api/servicemains/serviceDetailsByServiceId/${id}`, 'get').subscribe((success) => {
      // console.log(success);
      this.service = success;
    });

  }

  getSubServciesByServiceId(id){

    // console.log(data);

    this.httpcall.sendHttpCall('', `/api/servicemains/subServiceByServiceId/${id}`, 'get').subscribe((success) => {
      //console.log(success);
      this.subservices = success;
    });
  }

  getEmployeeType(item){

    this.httpcall.sendHttpCall('', `/api/employees/employeeType/${item}`, 'get').subscribe((success) => {
      
      this.empType =success.empType;
      console.log(this.empType);
    });
  }

}
