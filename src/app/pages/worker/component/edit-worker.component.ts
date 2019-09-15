import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { HttpService } from '../../../globalservice/http.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { NbDialogService, NbToastrService, NbToastRef } from '@nebular/theme';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Location } from '../../maps/search-map/entity/Location';
import { ShareService } from '../../../globalservice/share.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-edit-worker',
  templateUrl: './edit-worker.component.html',
  styleUrls: ['./edit-worker.component.scss']
})
export class EditWorkerComponent implements OnInit {
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

  fileName: any;
  regularScheduleFullMonth: any;
  regularSchedulePerDay: any;

  regularScheduleBody: any = [];
  temporaryScheduleBody: any = [];
  overTimeScheduleBody: any = [];
  selecteCompanyOption: any;
  overtTimeForFullMonth: any;

  editData: any;
  overTimeStat = false;
  linkSource: any = null;
  pdfUpload: any;
  workerName: any;
  employeeTypeData: any;
  public multiSelect: Boolean = true
  timeScheduleData: any = [];
  permananetEmpData: any;
  tempEmpData: any;
  show: boolean = true;


  constructor(
    public formservice: GlobalformService,
    private httpcall: HttpService,
    private fb: FormBuilder,
    private atp: AmazingTimePickerService,
    private dialogService: NbDialogService,
    private shareService: ShareService,
    config: NgbModalConfig,
    public toastrService: NbToastrService,
    private modalService: NgbModal,
    private router: Router,
    private datePipe: DatePipe) {

    this.editData = this.shareService.getdata();

    // console.log(this.editData);

    config.backdrop = 'static';
    config.keyboard = false;

    var mS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dates = new Date();
    var y = dates.getFullYear();
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
      this.calendar = [];
    }
    this.overTimeCalendar = this.calendar;

    this.fileUrl = this.editData.userPictrue;
    this.workerName = this.editData.name;
    this.addWorkerStep1 = new FormGroup({
      'workerName': new FormControl(this.editData.name ? this.editData.name : null, [Validators.required]),
      'workerLogo': new FormControl(this.editData.userPictrue ? this.editData.userPictrue : null),
      'workerAddress': new FormControl(this.editData.address ? this.editData.address : null, [Validators.required]),
      'workerPhoneNumber': new FormControl(this.editData.mobile ? this.editData.mobile : null, [Validators.required]),
      'workerPassword': new FormControl(this.editData.password ? this.editData.password : null, [Validators.required]),
      'workermail': new FormControl(this.editData.email ? this.editData.email : null, Validators.compose([
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
        Validators.required])),
      'country': new FormControl(this.editData.country ? this.editData.country : null, [Validators.required]),
      'city': new FormControl(this.editData.city ? this.editData.city : null, [Validators.required]),
      'company': new FormControl(this.editData.companyId ? this.editData.companyId : null, [Validators.required]),
      'latitude': new FormControl(this.editData.latitute ? this.editData.latitute : null),
      'longitude': new FormControl(this.editData.longitude ? this.editData.longitude : null),
    });

    this.searchedLocation = new Location(this.editData.latitude, this.editData.longitude);
    this.linkSource = this.editData.docPdfUrl;
    this.pdfUpload = this.editData.docPdfUrl;
    this.getemployee(this.editData.employeeType);
    this.getSubServciesByServiceId(this.editData.serviceType);

    this.addWorkerStep2 = new FormGroup({
      'employeeType': new FormControl(this.editData.employeeType ? this.editData.employeeType : null, [Validators.required]),
      'serviceType': new FormControl(this.editData.serviceType ? this.editData.serviceType : null, [Validators.required]),
      'subServiceType': new FormControl(this.editData.subServiceType ? this.editData.subServiceType : null, [Validators.required]),
      'experience': new FormControl(this.editData.experience ? this.editData.experience : null, [Validators.required]),
      'PreviousCompanies': new FormControl(this.editData.previousCompany ? this.editData.previousCompany : null, [Validators.required]),
      'Language': new FormControl(this.editData.languages ? this.editData.languages : null, [Validators.required]),
      'Gender': new FormControl(this.editData.gender ? this.editData.gender : null, [Validators.required]),
      'startTime': new FormControl('', [Validators.required]),
      'endTime': new FormControl('', [Validators.required]),
      'exclTax': new FormControl('', [Validators.required]),
      'OvertimeRate': new FormControl('', [Validators.required]),
      'tempEmployee': new FormControl(this.editData.tempEmployee ? this.editData.tempEmployee : null, [Validators.required]),
      'monthlySalary': new FormControl(this.editData.monthlySalary ? this.editData.monthlySalary : null),
      'hourlyRate': new FormControl(this.editData.hourlyRate ? this.editData.hourlyRate : null),

    });

    this.addWorkerStep3 = new FormGroup({
      'workerName': new FormControl(this.editData.name ? this.editData.name : null),
      'workerLogo': new FormControl(this.editData.userPictrue ? this.editData.userPictrue : null),
      'workerAddress': new FormControl(this.editData.address ? this.editData.address : null),
      'workerPhoneNumber': new FormControl(this.editData.mobile ? this.editData.mobile : null),
      'workermail': new FormControl(this.editData.email ? this.editData.email : null),
      'country': new FormControl(this.editData.country ? this.editData.country : null),
      'city': new FormControl(this.editData.city ? this.editData.city : null),
      'company': new FormControl(this.editData.companyId ? this.editData.companyId : null),
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


    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.httpcall.sendHttpCall('', '/api/roles/all', 'get').subscribe((success) => {
      //// // // console.log(success);
      this.roles = success;
    });
    this.httpcall.sendHttpCall('', '/api/countries/all', 'get').subscribe((success) => {
      //// // // console.log(success);
      this.countries = success;
    });

    this.httpcall.sendHttpCall('', '/api/cities/all', 'get').subscribe((success) => {
      //// // // console.log(success);
      this.cities = success;
    });

    this.httpcall.sendHttpCall('', '/api/companyProfiles/all', 'get').subscribe((success) => {
      //// // // console.log(success);
      this.companies = success;
    });
    this.httpcall.sendHttpCall('', '/api/employees/type/all', 'get').subscribe((success) => {
      //// // // console.log(success);
      this.EmployeeType = success;
    });

    this.httpcall.sendHttpCall('', '/api/servicemains/all', 'get').subscribe((success) => {
      //// // // console.log(success);
      this.services = success;
    });

    this.httpcall.sendHttpCall('', '/api/servicemains/sub-service/all', 'get').subscribe((success) => {
      //// // // console.log(success);
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

    // if(this.isTempEmployee == false){

    this.temporaryScheduleBody = this.editData.timeScheduleData[0].temporarySchedule;

    this.regularScheduleBody = this.editData.timeScheduleData[0].regularSchedule;
    this.overTimeScheduleBody = this.editData.timeScheduleData[0].overtimeSchedule;

    // }
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.


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
    // // // // console.log(data);

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
  //   // // // console.log(this.calendar);

  /**
   * 
   * @param event 
   * @description to updae tyhe location in google map
   */
  updateLocation(event: Location) {
    // // // console.log(event);
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
    // // // // console.log(event)
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileUrl = reader.result
        this.addWorkerStep1.controls['workerLogo'].setValue(this.fileUrl);
      };
      // // // // console.log(this.fileUrl);
    }
  }

  /**
   * @description to save the data of first step of worker
   */
  AddWorkerStep1() {
    if (this.addWorkerStep1.valid) {

      let id = this.editData._id;
      let body = {

        name: this.addWorkerStep1.value.workerName,
        userPictrue: this.addWorkerStep1.value.workerLogo,
        address: this.addWorkerStep1.value.workerAddress,
        mobile: this.addWorkerStep1.value.workerPhoneNumber,
        email: this.addWorkerStep1.value.workermail,
        password: this.addWorkerStep1.value.workerPassword,
        country: this.addWorkerStep1.value.country,
        city: this.addWorkerStep1.value.city,
        companyId: this.addWorkerStep1.value.company,
        latitute: this.editData.latitute,
        longitude: this.editData.longitude,
      }


      this.httpcall.sendHttpCall(JSON.stringify(body), `/api/workersProfiles/updateWorkersProfile/${id}`, 'put').subscribe((success: any) => {
        // // // // console.log(success);
        this.addworkerStepOne = this.editData._id;

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


    if (this.isTempEmployee == false) {

      this.timeScheduleData.push(this.permananetEmpData);


    } else {

      this.timeScheduleData.push(this.tempEmpData);

    }


    // // // // console.log(this.addWorkerStep2.value);
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

    // // // // console.log(body); 

    forkJoin([
      this.httpcall.sendHttpCall(JSON.stringify(body), `/api/workersProfiles/updateWorkersProfileStepTwo/${this.addworkerStepOne}`, 'put'),
    ]).subscribe((success) => {
      // // // // console.log(success);
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

  Upload(event) {
    this.pdfUpload = null;
    var reader = new FileReader;

    reader.readAsDataURL(event.target.files[0]);
    // reader = this.pdfUpload;
    var file;
    reader.onload = (e) => {
      file = e.target['result'];
    }

    setTimeout(() => {
      this.pdfUpload = file;

    }, 1000);

  }

  View() { }

  showPdf() {

    var currentDate = this.datePipe.transform(new Date(), "dd-MM-yyyy");

    const downloadLink = document.createElement("a");
    const fileName = this.workerName + "_" + currentDate + ".pdf";

    downloadLink.href = this.linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
    // var file = new Blob([this.linkSource], {type: 'application/pdf'});
    // const link = URL.createObjectURL(file);
    // window.open(link , '_blank');
  }

  updateWorker() {
    const toastRef: NbToastRef = this.toastrService.success("Worker Updated Successfully", 'Success', { duration: 3000 });
    this.router.navigateByUrl("pages/worker/list");
  }

  /**
   * 
   * @param data 
   * @description to get all the klist of temporary employee type list 
   */
  getemployee(data) {

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

  companyDataClick(company: any) {
    this.addWorkerStep1.controls['company'].setValue(company._id)
    let element: HTMLElement = document.getElementById("company-modal-btn") as HTMLElement;
    element.style.display = 'block';
  }

  companyModalData() {
    // // // // // console.log(this.companies)
    //// // // // console.log(this.selecteCompanyOption);
  }

  setRegularScheduleToday() {

    for (var i = 0; i <= 1; i++) {
      this.regularSchedulePerDay = this.regularScheduleFullMonth[i];
    }

    this.regularScheduleBody = {
      overTimePercentage: this.regularSchedulePerDay['is.regularSchedulePerDay'],
      startTime: this.regularSchedulePerDay['is.regularSchedulePerDay'],
      endTime: this.regularSchedulePerDay['is.regularSchedulePerDay'],
      price: this.regularSchedulePerDay['is.regularSchedulePerDay'],
      status: this.regularSchedulePerDay['is.regularSchedulePerDay'],
      workerId: this.addWorkerStep2.value.workerId,
      companyId: this.addWorkerStep2.value.companyId
    }

  }

  setRegularScheduleMonth() {
    this.regularScheduleBody = this.regularScheduleFullMonth;

    // this.httpcall.sendHttpCall(JSON.stringify(this.regularScheduleBody), `/api/workertimeschedules/regularSchedule`, 'post')
    //    .subscribe((success)=>{
    //     // // // console.log(success);
    //   });
  }

  getAllServcies() {

    this.httpcall.sendHttpCall('', '/api/servicemains/all', 'get').subscribe((success) => {
      //// // // console.log(success);
      this.services = success;
    });

  }

  getSubServciesByServiceId(id) {

    // // // // console.log(data);

    this.httpcall.sendHttpCall('', `/api/servicemains/subServiceByServiceId/${id}`, 'get').subscribe((success) => {
      //// // // console.log(success);
      this.subservices = success;
    });
  }

  getRegularScheduleData(item, month) {

    item['month'] = month;
    item['workerId'] = this.addworkerStepOne;
    item['companyId'] = this.addWorkerStep1.value.company;

    for (var i = 0; i < this.regularScheduleBody.length; i++) {
      var data = this.regularScheduleBody[i];
      var load = this.regularScheduleBody;
      Object.keys(data).forEach(function (key) {
        if (data[key] == month) {
          load.splice(i, 1);
        }
      });

    }

    this.regularScheduleBody.push(item);
    // // // console.log(this.regularScheduleBody);

  }

  getSingleOvertimeWiseData(item, month) {

    item['month'] = month;
    item['workerId'] = this.addworkerStepOne;
    item['companyId'] = this.addWorkerStep1.value.company;


    for (var i = 0; i < this.overTimeScheduleBody.length; i++) {
      var data = this.overTimeScheduleBody[i];
      var load = this.overTimeScheduleBody;
      Object.keys(data).forEach(function (key) {
        if (data[key] == month) {
          load.splice(i, 1);
        }
      });

    }

    this.overTimeScheduleBody.push(item);
  }


  getTemporaryScheduleData(item) {
    this.temporaryScheduleBody = item;
    // // // console.log(this.temporaryScheduleBody);
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

