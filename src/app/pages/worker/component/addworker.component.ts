import { Component, OnInit, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { HttpService } from '../../../globalservice/http.service';
import { Location } from '../../maps/search-map/entity/Location';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { forkJoin } from 'rxjs';
import { NbDialogService, NbToastrService, NbToastRef, NbCalendarRange, NbDateService } from '@nebular/theme';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShareService } from '../../../globalservice/share.service';
import { retryWhen } from 'rxjs/operators';

@Component({
  selector: 'ngx-addworker',
  templateUrl: './addworker.component.html',
  styleUrls: ['./addworker.component.scss']
})

export class AddworkerComponent implements OnInit, AfterViewInit {

  @ViewChild('item') accordion;
  @ViewChild('itemOverTime') accordionOverTime;


  addWorkerStep1: FormGroup;
  addWorkerStep2: FormGroup;
  addWorkerStep3: FormGroup;
  firstForm: FormGroup;
  roles: any;
  countries: any;
  cities: any;
  companies: any;
  workersProfiles: any;
  services: any;
  subservices: any;
  EmployeeType: any;
  fileUrl: any = '../../../../assets/images/no-user.jpg';
  searchedLocation: Location = new Location();
  sTime: any = '12:00';
  eTime: any = '12:00';
  addworkerStepOne: any;
  addworkerStepTwo: any;
  anyNumber: any = 0.00;
  calendar: any = [];
  overTimeCalendar: any = [];
  month: any;
  tempEmployees: any;
  isTempEmployee: boolean = null;
  regularPrice: Number = 0.00;
  maxDate: any;
  da: any;
  fullYear: any = [];
  shortNameOfDay: String[] = [];
  shortNameOfDayObj = {};
  overTimeData = [];
  overTimeStat: boolean = false;
  overtTimeForFullMonth: string = 'no';
  fileName:any;
  regularScheduleFullMonth:any;
  regularSchedulePerDay:any;
  regularScheduleBody:any = [];
  temporaryScheduleBody: any;
  overTimeScheduleBody: any = [];
  selecteCompanyOption: any;
  pdfUpload: any;
  companyData: any;

  switch: boolean = false;
  range: NbCalendarRange<Date>;

  message: string = "Hello Child";
  employeeTypeData: any;
  public multiSelect: Boolean = true;
  timeScheduleData: any = [];
  permananetEmpData: any;
  tempEmpData: any;
  show: boolean = true;

  constructor(
    public formservice: GlobalformService,
    private httpcall: HttpService,
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    private atp: AmazingTimePickerService,
    private dialogService: NbDialogService,
    config: NgbModalConfig,
    public toastrService: NbToastrService,
    private shareService: ShareService,
    private router: Router,
    private modalService: NgbModal) {

    this.companyData = this.shareService.getdata();
  
    config.backdrop = 'static';
    config.keyboard = false;

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
    this.overTimeCalendar = this.calendar;

    this.addWorkerStep1 = new FormGroup({
      'workerName': new FormControl('', [Validators.required]),
      'workerLogo': new FormControl(null),
      'workerAddress': new FormControl('', [Validators.required]),
      'workerPhoneNumber': new FormControl('', [Validators.required]),
      'workerPassword': new FormControl('', [Validators.required]),
      'workermail': new FormControl('', Validators.compose([
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
        Validators.required])),
      'country': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'company': new FormControl(this.companyData._id ? this.companyData._id : null, [Validators.required]),
      'latitude': new FormControl(),
      'longitude': new FormControl()
    });

    this.addWorkerStep2 = new FormGroup({
      'employeeType': new FormControl('', [Validators.required]),
      'serviceType': new FormControl('', [Validators.required]),
      'subServiceType': new FormControl('', [Validators.required]),
      'experience': new FormControl('', [Validators.required]),
      'PreviousCompanies': new FormControl('', [Validators.required]),
      'Language': new FormControl('', [Validators.required]),
      'Gender': new FormControl('', [Validators.required]),
      'startTime': new FormControl('', [Validators.required]),
      'endTime': new FormControl('', [Validators.required]),
      'exclTax': new FormControl('', [Validators.required]),
      'OvertimeRate': new FormControl('', [Validators.required]),
      'tempEmployee': new FormControl('', [Validators.required]),
      'monthlySalary': new FormControl(null),
      'hourlyRate': new FormControl(null),

    });

    this.addWorkerStep3 = new FormGroup({
      'workerName': new FormControl(),
      'workerLogo': new FormControl(),
      'workerAddress': new FormControl(),
      'workerPhoneNumber': new FormControl(),
      'workermail': new FormControl(),
      'country': new FormControl(),
      'city': new FormControl(),
      'company': new FormControl(),
      'employeeType': new FormControl(),
      'serviceType': new FormControl(),
      'subServiceType': new FormControl(),
      'experience': new FormControl(),
      'PreviousCompanies': new FormControl(),
      'Language': new FormControl(),
      'Gender': new FormControl(),
      'startTime': new FormControl(),
      'endTime': new FormControl(),
      'exclTax': new FormControl(),
      'OvertimeRate': new FormControl(),
    });

  }

  ngOnInit() {

    this.range = {
      start: this.dateService.addDay(this.monthStart, 3),
      end: this.dateService.addDay(this.monthEnd, -3),
    };  

    
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.httpcall.sendHttpCall('', '/api/roles/all', 'get').subscribe((success) => {
      //// console.log(success);
      this.roles = success;
    });
    this.httpcall.sendHttpCall('', '/api/countries/all', 'get').subscribe((success) => {
      //// console.log(success);
      this.countries = success;
    });

    this.httpcall.sendHttpCall('', '/api/cities/all', 'get').subscribe((success) => {
      //// console.log(success);
      this.cities = success;
    });

    this.httpcall.sendHttpCall('', '/api/companyProfiles/all', 'get').subscribe((success) => {
      //// console.log(success);
      this.companies = success;
    });
    this.httpcall.sendHttpCall('', '/api/employees/type/all', 'get').subscribe((success) => {
      //// console.log(success);
      this.EmployeeType = success;
    });

    this.httpcall.sendHttpCall('', '/api/servicemains/all', 'get').subscribe((success) => {
      //// console.log(success);
      this.services = success;
    });

    this.httpcall.sendHttpCall('', '/api/servicemains/sub-service/all', 'get').subscribe((success) => {
      //// console.log(success);
      this.subservices = success;
    });

    this.shortNameOfDayObj = {
      'Sunday': 'SUN',
      'Monday': 'MON',
      'Tuesday': 'TUES',
      'Wednesday': 'WED',
      'Thursday': 'THUR',
      'Friday': 'FRI',
      'Saturday': 'SAT'
    };

    // setTimeout(() => {
    //   var root = this;
    //   root.clickModalButton();
    // }, 200);

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    // // console.log(this.accordion);
  }


  openRegularSchedule(dialog: TemplateRef<any>, hasScroll: boolean) {
    this.dialogService.open(dialog, { hasScroll });
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

  /**
   * 
   * @param data 
   * @description to toggle regular schedule panel
   */
  toggle(data) {
    // // console.log(data);

    this.accordion.toggle();
  }

  /**
 * 
 * @param data 
 * @description to toggle overtime schedule panel
 */
  Overtimetoggle() {
    this.accordionOverTime.toggle();
  }

  // changeRegularPrice(input){
  //   this.calendar.map(o=>{
  //     o.price = input;
  //   })
  //   // console.log(this.calendar);

  /**
   * 
   * @param event 
   * @description to updae tyhe location in google map
   */
  updateLocation(event: Location) {
    this.searchedLocation = new Location(event.latitude, event.longitude);
    this.addWorkerStep1.controls['latitude'].setValue(event.latitude);
    this.addWorkerStep1.controls['longitude'].setValue(event.longitude)
  }


  /**
   * 
   * @param event 
   * @description to choose the worker profile picture
   */
  chooseLogo(event) {
    // // console.log(event)
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileUrl = reader.result
        this.addWorkerStep1.controls['workerLogo'].setValue(this.fileUrl);
      };
      // // console.log(this.fileUrl);
    }
  }

  /**
   * @description to save the data of first step of worker
   */
  AddWorkerStep1() {
    if (this.addWorkerStep1.valid) {
      let body = {
        name: this.addWorkerStep1.value.workerName,
        userPictrue: this.addWorkerStep1.value.workerLogo,
        address: this.addWorkerStep1.value.workerAddress,
        mobile: this.addWorkerStep1.value.workerPhoneNumber,
        email: this.addWorkerStep1.value.workermail,
        country: this.addWorkerStep1.value.country,
        password: this.addWorkerStep1.value.workerPassword,
        city: this.addWorkerStep1.value.city,
        companyId: this.addWorkerStep1.value.company,
        latitute: this.addWorkerStep1.value.latitude,
        longitude: this.addWorkerStep1.value.longitude,
      }

      this.httpcall.sendHttpCall(JSON.stringify(body), '/api/workersProfiles/stepOne', 'post').subscribe((success: any) => {
        // // console.log(success);
        this.addworkerStepOne = success.data._id;

});

      this.addWorkerStep3.controls['workerName'].setValue(this.addWorkerStep1.value.workerName);
      this.addWorkerStep3.controls['workerAddress'].setValue(this.addWorkerStep1.value.workerAddress);
      this.addWorkerStep3.controls['workerPhoneNumber'].setValue(this.addWorkerStep1.value.workerPhoneNumber);
      this.addWorkerStep3.controls['workerLogo'].setValue(this.addWorkerStep1.value.workerLogo);
      this.addWorkerStep3.controls['workermail'].setValue(this.addWorkerStep1.value.workermail);
      this.addWorkerStep3.controls['country'].setValue(this.addWorkerStep1.value.country);
      this.addWorkerStep3.controls['city'].setValue(this.addWorkerStep1.value.city);
      this.addWorkerStep3.controls['company'].setValue(this.addWorkerStep1.value.company);

    } else {
      this.formservice.validateAllFormFields(this.addWorkerStep1);
    }

  }

  /**
   * @description to save the second step of worker
   */
  AddWorkerStep2() {

    this.timeScheduleData = [];
    this.permananetEmpData = {
      regularSchedule: this.regularScheduleBody,
      overtimeSchedule: this.overTimeScheduleBody,
    }

    this.tempEmpData = {
      temporarySchedule: this.temporaryScheduleBody,
    }

    
    if(this.isTempEmployee == false){
      
      this.timeScheduleData.push(this.permananetEmpData);
      
      
    }else{
      
      this.timeScheduleData.push(this.tempEmpData);
      
    }

      let body = {
        tempEmployee: this.addWorkerStep2.value.tempEmployee,
        hourlyRate: this.addWorkerStep2.value.hourlyRate,
        employeeType: this.addWorkerStep2.value.employeeType,
        serviceId: this.addWorkerStep2.value.serviceType,
        subServiceId: this.addWorkerStep2.value.subServiceType,
        experience: this.addWorkerStep2.value.experience,
        previousCompany: this.addWorkerStep2.value.PreviousCompanies,
        languages: this.addWorkerStep2.value.Language,
        gender: this.addWorkerStep2.value.Gender,
        startTime: this.addWorkerStep2.value.startTime,
        endTime: this.addWorkerStep2.value.endTime,
        exclTax: this.addWorkerStep2.value.exclTax,
        overtime: this.overTimeStat,
        markerimage: this.addWorkerStep2.value.markerimage,
        monthlySalary: this.addWorkerStep2.value.monthlySalary,
        travellingCost: this.addWorkerStep2.value.travellingCost,
        deviceInfo: this.addWorkerStep2.value.deviceInfo,
        securityCode: this.addWorkerStep2.value.securityCode,
        updatedAt: this.addWorkerStep2.value.updatedAt,
        updatedBy: this.addWorkerStep2.value.updatedBy,
        lastLoginInfo: this.addWorkerStep2.value.lastLoginInfo,
        isMobileDevice: this.addWorkerStep2.value.isMobileDevice,
        jobStatus: this.addWorkerStep2.value.jobStatus,
        loggedIn: this.addWorkerStep2.value.loggedIn,
        avg_rating: this.addWorkerStep2.value.avg_rating,
        working_hour: this.addWorkerStep2.value.working_hour,
        docPdfUrl: this.pdfUpload,
        timeScheduleData: this.timeScheduleData,
      }

     

      forkJoin([
        this.httpcall.sendHttpCall(JSON.stringify(body), `/api/workersProfiles/stepTwo/${this.addworkerStepOne}`, 'post'),
        // this.httpcall.sendHttpCall(JSON.stringify(this.regularScheduleBody), `/api/workertimeschedules/regularSchedule/save`, 'post'),
        // this.httpcall.sendHttpCall(JSON.stringify(this.overTimeScheduleBody), `/api/workertimeschedules/everydayOvertimeSchedule/`, 'post'),
        // // this.httpcall.sendHttpCall(this.fileName, `/api/workersProfiles/upload/docPdf`, 'post'),
      ]).subscribe((success) => {
        // console.log(success);
      });

      this.addWorkerStep3.controls['employeeType'].setValue(this.addWorkerStep2.value.employeeType);
      this.addWorkerStep3.controls['serviceType'].setValue(this.addWorkerStep2.value.serviceType);
      this.addWorkerStep3.controls['subServiceType'].setValue(this.addWorkerStep2.value.subServiceType);
      this.addWorkerStep3.controls['experience'].setValue(this.addWorkerStep2.value.experience);
      this.addWorkerStep3.controls['PreviousCompanies'].setValue(this.addWorkerStep2.value.PreviousCompanies);
      this.addWorkerStep3.controls['Language'].setValue(this.addWorkerStep2.value.Language);
      this.addWorkerStep3.controls['Gender'].setValue(this.addWorkerStep2.value.Gender);
      this.addWorkerStep3.controls['startTime'].setValue(this.addWorkerStep2.value.startTime);
      this.addWorkerStep3.controls['endTime'].setValue(this.addWorkerStep2.value.endTime);
      this.addWorkerStep3.controls['exclTax'].setValue(this.addWorkerStep2.value.exclTax);
      this.addWorkerStep3.controls['OvertimeRate'].setValue(this.addWorkerStep2.value.OvertimeRate);

  }

  /**
 * @description to save the third step of worker
 */
  AddWorkerStep3() {
    if (this.addWorkerStep3.valid) {

    } else {
      this.formservice.validateAllFormFields(this.addWorkerStep3);
    }
  }

  //Use EventEmitter
  /**
   * 
   * @param data 
   * @param index 
   * @param childPosition
   * @description to get the over tiem schedule data from overtime component by using EvenEmmiter 
   */
  getSingleOvertimeWiseData(item, month) {
    
    item['month'] = month;
    item['workerId'] = this.addworkerStepOne;
    item['companyId'] = this.addWorkerStep1.value.company;

    
    for(var i=0; i<this.overTimeScheduleBody.length; i++){
      var data = this.overTimeScheduleBody[i];
      var load = this.overTimeScheduleBody;  
      Object.keys(data).forEach(function(key){
        if(data[key] == month){
          load.splice(i,1);
        }
      });
      
    }

    this.overTimeScheduleBody.push(item);
    
    // console.log(this.overTimeScheduleBody);
    
  }

  Upload(event) {
    
    var reader = new FileReader;

    reader.readAsDataURL(event.target.files[0]);
    // reader = this.pdfUpload;
    var file;
    reader.onload = (e) =>{
      file = e.target['result'];
    }

    setTimeout(()=>{
      this.pdfUpload = file;
      
    },1000);    

  }

  View() { }

  addworker() {
    const toastRef: NbToastRef = this.toastrService.success("Worker Added Successfully", 'Success', { duration: 3000 });

    this.router.navigateByUrl("pages/worker/list");
   }

  /**
   * 
   * @param data 
   * @description to get all the klist of temporary employee type list 
   */
  getemployee(data) {
    this.employeeTypeData = data;
    // console.log(data);
    this.httpcall.sendHttpCall('', `/api/employees/temporeryEmployee/${data}`, 'get').subscribe((success) => {
      this.tempEmployees = success;
      if (success.length > 0) {
        this.isTempEmployee = true;
      } else {
        this.isTempEmployee = false;
      }
    })
  }

  clickModalButton() {
    let element: HTMLElement = document.getElementById("modal-btn") as HTMLElement;
    element.click();
  }

  open(content) {
    this.modalService.open(content);
  }

  companyDataClick(company:any) {
    this.addWorkerStep1.controls['company'].setValue(company._id)
    let element: HTMLElement = document.getElementById("company-modal-btn") as HTMLElement;
    element.style.display = 'block';
  }

  companyModalData() {
    // // console.log(this.companies)
    //// console.log(this.selecteCompanyOption);
  }
  
  
  setRegularScheduleMonth(){
    this.regularScheduleBody = this.regularScheduleFullMonth;
  }

  getSubServciesByServiceId(id){

    // // console.log(data);

    this.httpcall.sendHttpCall('', `/api/servicemains/subServiceByServiceId/${id}`, 'get').subscribe((success) => {
      //// console.log(success);
      this.subservices = success;
    });
  }


  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }

  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  darValue() {
    // console.log(this.range);
  }

  dateValue(event){
    
    // console.log(event);
  
  }

  getSelectedOffDates(event){
    // console.log(event);
  }

  getRegularScheduleData(item,month){
    
    item['month'] = month;
    item['workerId'] = this.addworkerStepOne;
    item['companyId'] = this.addWorkerStep1.value.company;
    
    for(var i=0; i<this.regularScheduleBody.length; i++){
      var data = this.regularScheduleBody[i];
      var load = this.regularScheduleBody;  
      Object.keys(data).forEach(function(key){
        if(data[key] == month){
          load.splice(i,1);
        }
      });
      
    }
      
    this.regularScheduleBody.push(item);
    // console.log(this.regularScheduleBody);
    
  }

  getWorkerList(item){

  }

  getTemporaryScheduleData(item){
    this.temporaryScheduleBody = item;
    // console.log(this.temporaryScheduleBody);
  }

  
}

export class Timecalendar {
  startTime?: any;
  endTime?: any;
  regularDate?: any;
  workerId?: any;
  price?: any;
  date: any;
  day: any;
  month: any;
  year: any;
  checkBox?: Boolean = false;
  workhour?: any;
  overTime?: any = [new OverTimecalendar()];
}

export class OverTimecalendar {
  startTime?: any;
  endTime?: any;
  regularDate?: any;
  percentage?: any;
  price?: any;
  workhour?: any;
  workerId?: any;
  date: any;
  day: any;
  month: any;
  year: any;
  checkBox?: Boolean = false;
}

