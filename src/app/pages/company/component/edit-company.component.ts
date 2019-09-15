import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { NbToastRef, NbDateService, NbToastrService } from '@nebular/theme';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { HttpService } from '../../../globalservice/http.service';
import { ShareService } from '../../../globalservice/share.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '../../maps/search-map/entity/Location';
import { AppUrlsConst } from '../../../app.config';

@Component({
  selector: 'ngx-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {


  AddCompanyStep1: FormGroup;
  AddCompanyStep2: FormGroup;
  AddCompanyStep3: FormGroup;
  AddCompanyStep4: FormGroup;
  firstForm: FormGroup;
  date: any = new Date();
  min: Date;
  max: Date;
  countries: any;
  cities: any;
  services: any;
  owners: any;
  roles: any;
  insuranceType: any;
  agreements: any;
  agreementTypes: any;
  dropdownOptions: any = ['First Ower', 'Second Ower', 'Third Ower'];
  isAgreement: Boolean = false;
  isAgreementType: Boolean = false;
  isInsurance: Boolean = false;
  isInsuranceType: Boolean = false;
  radioArray = [{ name: 'YES', value: '1' }, { name: 'NO', value: '0' }]
  config = {
    displayKey: "description", //if objects array passed which key to be displayed defaults to description
    search: true //true/false for the search functionlity defaults to false,
  }
  fileUrl: any = '../../../../assets/images/no-image.png';
  public docfileUrl: any;
  companyTypes: any;
  fileName: any;
  userdetails: any;
  editData: any;
  searchedLocation: Location = new Location();
  isUploadAgreement: boolean = false;
  docfile: any;
  taxes: any;
  AllowCreditOrgs: any;
  isAllowCreditOrganisation: Boolean = false;
  isTax: Boolean = false;
  allowCreditInterested: boolean = false;
  allowTaxInterested: boolean = false;
  companyId: any;



  constructor(public formservice: GlobalformService,
    private fb: FormBuilder,
    protected dateService: NbDateService<Date>,
    private httpcall: HttpService,
    public toastrService: NbToastrService,
    private shareService: ShareService,
    private router: Router,
    private modalService: NgbModal) {

    this.editData = this.shareService.getdata()
    console.log(this.editData);

    this.httpcall.sendHttpCall('', `/api/companyProfiles/${this.editData._id}`, 'get').subscribe((success) => {
      console.log(success);
    })
    this.fileUrl = AppUrlsConst.IMG_URL + '/public/images/uploads/' + this.editData.compLogo;


    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);



    this.AddCompanyStep1 = new FormGroup({

      'compName': new FormControl(this.editData.compName ? this.editData.compName : null, [Validators.required]),
      'compLogo': new FormControl(this.editData.compLogo ? this.editData.compLogo : null, [Validators.required]),
      'compAddress': new FormControl(this.editData.compAddress ? this.editData.compAddress : null, [Validators.required]),
      'compPhoneNumber': new FormControl(this.editData.compPhoneNumber ? this.editData.compPhoneNumber : null, [Validators.required]),
      'compOrgId': new FormControl(this.editData.compOrgId ? this.editData.compOrgId : null, [Validators.required]),
      'compWebUrl': new FormControl(this.editData.compWebUrl ? this.editData.compWebUrl : null),
      'userRole': new FormControl(this.editData.userRole ? this.editData.userRole : null, [Validators.required]),
      'owners': new FormControl(this.editData.owners ? this.editData.owners : null, [Validators.required]),
      'comhistory': new FormControl(this.editData.comhistory ? this.editData.comhistory : null, [Validators.required]),
      'establish': new FormControl(this.editData.establish ? this.editData.establish : null, [Validators.required]),
      'email': new FormControl(this.editData.email ? this.editData.email : null, Validators.compose([
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
        Validators.required])),
      'country': new FormControl(this.editData.country ? this.editData.country : null, [Validators.required]),
      'city': new FormControl(this.editData.city ? this.editData.city : null, [Validators.required]),
      'ftaxNumber': new FormControl(this.editData.ftaxNumber ? this.editData.ftaxNumber : null),
      'companyType': new FormControl(this.editData.companyType ? this.editData.companyType : null, [Validators.required]),
      'latitude': new FormControl(this.editData.latitude ? this.editData.latitude : null),
      'longitude': new FormControl(this.editData.longitude ? this.editData.longitude : null)
    })

    this.AddCompanyStep2 = new FormGroup({
      'service': new FormControl(this.editData.service ? this.editData.service : null, [Validators.required]),
      'allowCredit': new FormControl(this.editData.allowCredit ? this.editData.allowCredit : null, [Validators.required]),
      'isTaxAllow': new FormControl(this.editData.isTaxAllow ? this.editData.isTaxAllow : null, [Validators.required]),
      'governmentProject': new FormControl(this.editData.governmentProject ? this.editData.governmentProject : null, [Validators.required]),
      'unemployementList': new FormControl(this.editData.unemployementList ? this.editData.unemployementList : null, [Validators.required]),
      'collectiveAgreementName': new FormControl(this.editData.collectiveAgreementName ? this.editData.collectiveAgreementName : null),
      'insurance': new FormControl(this.editData.insurance ? this.editData.insurance : null, [Validators.required]),
      'insuranceType': new FormControl(this.editData.insuranceType ? this.editData.insuranceType : null),
      'agreement': new FormControl(this.editData.agreement ? this.editData.agreement : null),
      'agreementType': new FormControl(this.editData.agreementType ? this.editData.agreementType : null),
      'uploadedAgreement': new FormControl(this.editData.uploadedAgreement ? this.editData.uploadedAgreement : null),
      'taxSystem': new FormControl(this.editData.taxSystem ? this.editData.taxSystem : null),
      'allowCreditOrganistionId': new FormControl(this.editData.allowCreditOrganistionId ? this.editData.allowCreditOrganistionId : null),
      'materialSale': new FormControl(this.editData.materialSale ? this.editData.materialSale : null),
    });

    this.AddCompanyStep3 = new FormGroup({
      'bankAccountNumber': new FormControl(this.editData.bankAccountNumber ? this.editData.bankAccountNumber : null),
      'bankBranchCode': new FormControl(this.editData.bankBranchCode ? this.editData.bankBranchCode : null),
      'bankBranchName': new FormControl(this.editData.bankBranchName ? this.editData.bankBranchName : null),
    });

    this.AddCompanyStep4 = new FormGroup({
      'compName': new FormControl({ value: this.editData.compName ? this.editData.compName : null, disabled: true }),
      'compLogo': new FormControl({ value: this.editData.compLogo ? this.editData.compLogo : null, disabled: true }),
      'compAddress': new FormControl({ value: this.editData.compAddress ? this.editData.compAddress : null, disabled: true }),
      'compPhoneNumber': new FormControl({ value: this.editData.compPhoneNumber ? this.editData.compPhoneNumber : null, disabled: true }),
      'compOrgId': new FormControl({ value: this.editData.compOrgId ? this.editData.compOrgId : null, disabled: true }),
      'compWebUrl': new FormControl({ value: this.editData.compWebUrl ? this.editData.compWebUrl : null, disabled: true }),
      'comhistory': new FormControl({ value: this.editData.comhistory ? this.editData.comhistory : null, disabled: true }),
      'ftaxNumber': new FormControl({ value: this.editData.ftaxNumber ? this.editData.ftaxNumber : null, disabled: true }),
      'companyType': new FormControl({ value: this.editData.companyType ? this.editData.companyType : null, disabled: true }),
      'country': new FormControl({ value: this.editData.country ? this.editData.country : null, disabled: true }),
      'city': new FormControl({ value: this.editData.city ? this.editData.city : null, disabled: true }),
      'establish': new FormControl({ value: this.editData.establish ? this.editData.establish : null, disabled: true }),
      'email': new FormControl({ value: this.editData.email ? this.editData.email : null, disabled: true }),
      'service': new FormControl({ value: this.editData.service ? this.editData.service : null, disabled: true }),
      'allowCredit': new FormControl({ value: this.editData.allowCredit == true ? '1' : '0', disabled: true }),
      'isTaxAllow': new FormControl({ value: this.editData.isTaxAllow ? this.editData.isTaxAllow : null, disabled: true }),
      'governmentProject': new FormControl({ value: this.editData.governmentProject ? this.editData.governmentProject : null, disabled: true }),
      'collectiveAgreementName': new FormControl({ value: this.editData.collectiveAgreementName ? this.editData.collectiveAgreementName : null, disabled: true }),
      'insurance': new FormControl({ value: this.editData.insurance == true ? '1' : '0', disabled: true }),
      'insuranceType': new FormControl({ value: this.editData.insuranceType ? this.editData.insuranceType : null, disabled: true }),
      'bankAccountNumber': new FormControl({ value: this.editData.bankAccountNumber ? this.editData.bankAccountNumber : null, disabled: true }),
      'bankBranchCode': new FormControl({ value: this.editData.bankBranchCode ? this.editData.bankBranchCode : null, disabled: true }),
      'bankBranchName': new FormControl({ value: this.editData.bankBranchName ? this.editData.bankBranchName : null, disabled: true }),
      'owners': new FormControl({ value: this.editData.owners ? this.editData.owners : null, disabled: true }),
    })

    if (this.AddCompanyStep2.value.insurance == true) {
      this.AddCompanyStep2.controls['insurance'].setValue('1');
      this.isInsurance = true;
      this.isInsuranceType = true;
    } if (this.AddCompanyStep2.value.collectiveAgreementName) {
      this.AddCompanyStep2.controls['agreement'].setValue('1');
      this.isAgreement = true;
      this.isAgreementType = true;
    }
    if (this.AddCompanyStep2.value.allowCredit == true) {
      this.AddCompanyStep2.controls['allowCredit'].setValue('1');
      this.isAllowCreditOrganisation = true;
    } else if (this.AddCompanyStep2.value.allowCredit == false) {
      this.AddCompanyStep2.controls['allowCredit'].setValue('0');
      this.isAllowCreditOrganisation = false;
      this.allowCreditInterested = true;
    }
    if (this.AddCompanyStep2.value.isTaxAllow == true) {
      this.AddCompanyStep2.controls['isTaxAllow'].setValue('1');
      this.isTax = true;
    } else if (this.AddCompanyStep2.value.isTaxAllow == false) {
      this.AddCompanyStep2.controls['isTaxAllow'].setValue('0');
      this.allowTaxInterested = true;
      this.isTax = false;
    }
    if (this.AddCompanyStep2.value.governmentProject == true) {
      this.AddCompanyStep2.controls['governmentProject'].setValue('1');
    }
    if (this.AddCompanyStep2.value.unemployementList == true) {
      this.AddCompanyStep2.controls['unemployementList'].setValue('1');
    }
    if (this.AddCompanyStep2.value.materialSale == true) {
      this.AddCompanyStep2.controls['materialSale'].setValue('1');
    }

  }
  compAddressFromSearch: any
  updateLocation(event: Location) {
    this.searchedLocation = new Location(event.latitude, event.longitude);
    console.log(this.searchedLocation);

    this.AddCompanyStep1.controls['latitude'].setValue(event.latitude);
    this.AddCompanyStep1.controls['longitude'].setValue(event.longitude)

  }

  /**
 * @description ad company
 */
  addCompanyStep1() {
    console.log(this.AddCompanyStep1.value);

    if (this.AddCompanyStep1.valid) {
      console.log(this.AddCompanyStep1.value);
      let body = {
        _id: this.editData._id,
        compName: this.AddCompanyStep1.value.compName,
        compAddress: this.AddCompanyStep1.value.compAddress,
        compPhoneNumber: this.AddCompanyStep1.value.compPhoneNumber,
        compOrgId: this.AddCompanyStep1.value.compOrgId,
        compWebUrl: this.AddCompanyStep1.value.compWebUrl,
        userRole: this.AddCompanyStep1.value.userRole,
        email: this.AddCompanyStep1.value.email,
        owners: this.AddCompanyStep1.value.owners,
        establish: this.AddCompanyStep1.value.establish,
        comhistory: this.AddCompanyStep1.value.comhistory,
        country: this.AddCompanyStep1.value.country,
        city: this.AddCompanyStep1.value.city,
        ftaxNumber: this.AddCompanyStep1.value.ftaxNumber,
        latitude: this.AddCompanyStep1.value.latitude,
        longitude: this.AddCompanyStep1.value.longitude,
        companyType: this.AddCompanyStep1.value.companyType,
        createdAt: Date.now(),
        createdBy: this.userdetails.roleId,
        updatedAt: Date.now(),
        updatedBy: this.userdetails.roleId,
      }
      if (this.fileName) {
        this.httpcall.sendHttpCall(this.fileName, '/api/companyProfiles/upload/images', 'post').subscribe((data) => {
          console.log(data, 'image uploaded successfully');
          const toastRef: NbToastRef = this.toastrService.success('Image uploaded successfully', 'Success', { duration: 3000 });
          this.httpcall.sendHttpCall(body, '/api/companyProfiles/stepOne', 'post').subscribe((success) => {
            console.log(success);
            this.companyId = success._id;

            const toastRef: NbToastRef = this.toastrService.success(success.message, 'Success', { duration: 3000 });
            this.AddCompanyStep4.controls['compName'].setValue(this.AddCompanyStep1.value.compName);
            this.AddCompanyStep4.controls['compAddress'].setValue(this.AddCompanyStep1.value.compAddress);
            this.AddCompanyStep4.controls['compPhoneNumber'].setValue(this.AddCompanyStep1.value.compPhoneNumber);
            this.AddCompanyStep4.controls['compLogo'].setValue(this.AddCompanyStep1.value.compLogo);
            this.AddCompanyStep4.controls['compOrgId'].setValue(this.AddCompanyStep1.value.compOrgId);
            this.AddCompanyStep4.controls['compWebUrl'].setValue(this.AddCompanyStep1.value.compWebUrl);
            this.AddCompanyStep4.controls['email'].setValue(this.AddCompanyStep1.value.email);
            this.AddCompanyStep4.controls['owners'].setValue(this.AddCompanyStep1.value.owners);
            this.AddCompanyStep4.controls['establish'].setValue(this.AddCompanyStep1.value.establish);
            this.AddCompanyStep4.controls['comhistory'].setValue(this.AddCompanyStep1.value.comhistory);
            this.AddCompanyStep4.controls['country'].setValue(this.AddCompanyStep1.value.country);
            this.AddCompanyStep4.controls['city'].setValue(this.AddCompanyStep1.value.city);
            this.AddCompanyStep4.controls['ftaxNumber'].setValue(this.AddCompanyStep1.value.ftaxNumber);
            this.AddCompanyStep4.controls['companyType'].setValue(this.AddCompanyStep1.value.companyType);
          })

        });
      }else{
       
          this.httpcall.sendHttpCall(body, '/api/companyProfiles/stepOne', 'post').subscribe((success) => {
            console.log(success);
            //this.companyId = success._id;

            const toastRef: NbToastRef = this.toastrService.success(success.message, 'Success', { duration: 3000 });
            this.AddCompanyStep4.controls['compName'].setValue(this.AddCompanyStep1.value.compName);
            this.AddCompanyStep4.controls['compAddress'].setValue(this.AddCompanyStep1.value.compAddress);
            this.AddCompanyStep4.controls['compPhoneNumber'].setValue(this.AddCompanyStep1.value.compPhoneNumber);
            this.AddCompanyStep4.controls['compLogo'].setValue(this.AddCompanyStep1.value.compLogo);
            this.AddCompanyStep4.controls['compOrgId'].setValue(this.AddCompanyStep1.value.compOrgId);
            this.AddCompanyStep4.controls['compWebUrl'].setValue(this.AddCompanyStep1.value.compWebUrl);
            this.AddCompanyStep4.controls['email'].setValue(this.AddCompanyStep1.value.email);
            this.AddCompanyStep4.controls['owners'].setValue(this.AddCompanyStep1.value.owners);
            this.AddCompanyStep4.controls['establish'].setValue(this.AddCompanyStep1.value.establish);
            this.AddCompanyStep4.controls['comhistory'].setValue(this.AddCompanyStep1.value.comhistory);
            this.AddCompanyStep4.controls['country'].setValue(this.AddCompanyStep1.value.country);
            this.AddCompanyStep4.controls['city'].setValue(this.AddCompanyStep1.value.city);
            this.AddCompanyStep4.controls['ftaxNumber'].setValue(this.AddCompanyStep1.value.ftaxNumber);
            this.AddCompanyStep4.controls['companyType'].setValue(this.AddCompanyStep1.value.companyType);
          })

      }



    } else {
      this.formservice.validateAllFormFields(this.AddCompanyStep1);
    }

  }
  addCompanyStep2() {
    if (this.AddCompanyStep2.valid) {
      console.log(this.AddCompanyStep2.value);
      let body = {
        service: this.AddCompanyStep2.value.service,
        allowCredit: this.AddCompanyStep2.value.allowCredit,
        isTaxAllow: this.AddCompanyStep2.value.isTaxAllow,
        governmentProject: this.AddCompanyStep2.value.governmentProject,
        unemployementList: this.AddCompanyStep2.value.unemployementList,
        collectiveAgreementName: this.AddCompanyStep2.value.collectiveAgreementName,
        insurance: this.AddCompanyStep2.value.insurance,
        insuranceType: this.AddCompanyStep2.value.insuranceType,
        allowCreditOrganistionId: this.AddCompanyStep2.value.allowCreditOrganistionId,
        agreementType: this.AddCompanyStep2.value.agreementType,
        taxSystem: this.AddCompanyStep2.value.taxSystem,
        materialSale: this.AddCompanyStep2.value.materialSale,
        updatedAt: Date.now(),
        updatedBy: this.userdetails.roleId,
      }
      console.log(body);
      this.httpcall.sendHttpCall(body, `/api/companyProfiles/stepTwo/${this.editData._id}`, 'post').subscribe((success) => {
        console.log(success);
        const toastRef: NbToastRef = this.toastrService.success(success.message, 'Success', { duration: 3000 });

        this.AddCompanyStep4.controls['service'].setValue(this.AddCompanyStep2.value.service);
        this.AddCompanyStep4.controls['allowCredit'].setValue(this.AddCompanyStep2.value.allowCredit);
        this.AddCompanyStep4.controls['isTaxAllow'].setValue(this.AddCompanyStep2.value.isTaxAllow);
        this.AddCompanyStep4.controls['governmentProject'].setValue(this.AddCompanyStep2.value.governmentProject);
        this.AddCompanyStep4.controls['collectiveAgreementName'].setValue(this.AddCompanyStep2.value.collectiveAgreementName);
        this.AddCompanyStep4.controls['insurance'].setValue(this.AddCompanyStep2.value.insurance);
        this.AddCompanyStep4.controls['insuranceType'].setValue(this.AddCompanyStep2.value.insuranceType);

        console.log(this.AddCompanyStep4.value, 'Add company 4 values');

      })



    } else {
      this.formservice.validateAllFormFields(this.AddCompanyStep2);
    }

  }
  addCompanyStep3() {
    if (this.AddCompanyStep3.valid) {
      console.log(this.AddCompanyStep2.value);
      let body = {

        bankAccountNumber: this.AddCompanyStep3.value.bankAccountNumber,
        bankBranchCode: this.AddCompanyStep3.value.bankBranchCode,
        bankBranchName: this.AddCompanyStep3.value.bankBranchName,
        updatedAt: Date.now(),
        updatedBy: this.userdetails.roleId,
      }
      console.log(body);
      this.httpcall.sendHttpCall(body, `/api/companyProfiles/stepThree/${this.editData._id}`, 'post').subscribe((success) => {
        console.log(success);
        const toastRef: NbToastRef = this.toastrService.success(success.message, 'Success', { duration: 3000 });
        this.AddCompanyStep4.controls['bankAccountNumber'].setValue(this.AddCompanyStep3.value.bankAccountNumber);
        this.AddCompanyStep4.controls['bankBranchCode'].setValue(this.AddCompanyStep3.value.bankBranchCode);
        this.AddCompanyStep4.controls['bankBranchName'].setValue(this.AddCompanyStep3.value.bankBranchName);
      })



    } else {
      this.formservice.validateAllFormFields(this.AddCompanyStep3);
    }

  }

  addCompanyStep4() {
    if (this.AddCompanyStep4.valid) {
      let body = {
        compName: this.AddCompanyStep4.value.compName,
        compAddress: this.AddCompanyStep4.value.compAddress,
        compPhoneNumber: this.AddCompanyStep4.value.compPhoneNumber,
        compLogo: this.AddCompanyStep4.value.compLogo,
        compOrgId: this.AddCompanyStep4.value.compOrgId,
        compWebUrl: this.AddCompanyStep4.value.compWebUrl,
        email: this.AddCompanyStep4.value.email,
        owners: this.AddCompanyStep4.value.owners,
        establish: this.AddCompanyStep4.value.establish,
        comhistory: this.AddCompanyStep4.value.comhistory,
        country: this.AddCompanyStep4.value.country,
        city: this.AddCompanyStep4.value.city,
        ftaxNumber: this.AddCompanyStep4.value.ftaxNumber,
        companyType: this.AddCompanyStep4.value.companyType,
        service: this.AddCompanyStep4.value.service,
        allowCredit: this.AddCompanyStep4.value.allowCredit,
        isTaxAllow: this.AddCompanyStep4.value.isTaxAllow,
        governmentProject: this.AddCompanyStep4.value.governmentProject,
        collectiveAgreementName: this.AddCompanyStep4.value.collectiveAgreementName,
        insurance: this.AddCompanyStep4.value.insurance,
        insuranceType: this.AddCompanyStep4.value.insuranceType,
        bankAccountNumber: this.AddCompanyStep4.value.bankAccountNumber,
        bankBranchCode: this.AddCompanyStep4.value.bankBranchCode,
        bankBranchName: this.AddCompanyStep4.value.bankBranchName,
      }

      console.log(body);
      this.httpcall.sendHttpCall(body, `/api/companyProfiles/stepFour/${this.editData._id}`, 'post').subscribe((success) => {
        console.log(success);
        const toastRef: NbToastRef = this.toastrService.success(success.message, 'Success', { duration: 3000 });
        this.router.navigate(['/pages/company/list']);
      })
    } else {
      this.formservice.validateAllFormFields(this.AddCompanyStep4);
    }
  }

  ngOnInit() {
    var data = localStorage.getItem("user_data");
    this.userdetails = JSON.parse(data);

    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.httpcall.sendHttpCall('', '/api/countries/all', 'get').subscribe((success) => {
      // console.log(success);
      this.countries = success;
    });

    this.httpcall.sendHttpCall('', '/api/cities/all', 'get').subscribe((success) => {
      //console.log(success);
      this.cities = success;
    });

    this.httpcall.sendHttpCall('', '/api/companyOwners/all', 'get').subscribe((success) => {
      //console.log(success);
      this.owners = success;
    });

    this.httpcall.sendHttpCall('', '/api/insurances/type/all', 'get').subscribe((success) => {
      // console.log(success);
      this.insuranceType = success;
    });

    this.httpcall.sendHttpCall('', '/api/servicemains/all', 'get').subscribe((success) => {
      // console.log(success);
      this.services = success;
    });

    this.httpcall.sendHttpCall('', '/api/roles/all', 'get').subscribe((success) => {
      // console.log(success);
      this.roles = success;
    });

    this.httpcall.sendHttpCall('', '/api/agreements/all', 'get').subscribe((success) => {
      // console.log(success);
      this.agreements = success;
    });

    this.httpcall.sendHttpCall('', '/api/agreements/type/all', 'get').subscribe((success) => {
      //console.log(success);
      this.agreementTypes = success;
    });

    this.httpcall.sendHttpCall('', '/api/companyTypes/all', 'get').subscribe((success) => {
      // console.log(success);
      this.companyTypes = success;
    });

    this.httpcall.sendHttpCall('', '/api/taxes/all', 'get').subscribe((success) => {
      // console.log(success,'taxxxxxxxxxxxxxxx');
      this.taxes = success

    })
    this.httpcall.sendHttpCall('', '/api/allowCreditOrganistions/all', 'get').subscribe((success) => {
      //console.log(success,'allow credittttttttttttttttt');
      this.AllowCreditOrgs = success;

    })

  }

  agreementStatus(data) {
    console.log(data);
    if (data === '1') {
      this.isAgreement = true;
    } else {
      this.isAgreement = false;
      this.isAgreementType = false;
      this.isUploadAgreement = false;
    }
  }

  insuranceStatus(data) {
    console.log(data);
    if (data === '1') {
      this.isInsurance = true;
      console.log(this.AddCompanyStep2.value);

    } else {
      this.isInsurance = false;
      this.isInsuranceType = false;
    }

  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  /**
   * 
   * @param data 
   * @description to get agreements Types
   */
  getAgreementval(data) {
    console.log(data);
    this.httpcall.sendHttpCall('', '/api/agreements/' + data, 'get').subscribe((success) => {
      console.log(success);
      if (success) {
        this.agreements = success;
        this.isAgreementType = true;
      }
    });
  }

  allowCredit(data) {
    console.log(data);
    if (data == 1) {
      this.isAllowCreditOrganisation = true;
      this.allowCreditInterested = false;
    } else {
      this.allowCreditInterested = true;
      this.isAllowCreditOrganisation = false;
    }

  }

  allowTax(data) {
    console.log(data);
    if (data == 1) {
      this.isTax = true;
      this.allowTaxInterested = false;
    } else {
      this.allowTaxInterested = true;
      this.isTax = false;
    }
  }

  /**
   * 
   * @param data 
   * @description to choice wheather the user interested to allow credit or not
   */
  alloCreditChoice(data) {
    console.log(data);
    if (data.target.value == 0) {
      this.isAllowCreditOrganisation = false;
    } else {
      this.isAllowCreditOrganisation = true;
    }

  }

  /**
   * 
   * @param data 
   * @description to choice wheather the user interested to allow tax or not
   */
  alloTaxChoice(data) {
    console.log(data);
    if (data.target.value == 0) {
      this.isTax = false;
    } else {
      this.isTax = true;
    }
  }

  /**
   * 
   * @param data 
   * @description to get collective agreements name
   */
  getAgreementName(data) {
    console.log(data);
    this.isUploadAgreement = true;

  }
  /**
   * 
   * @param data 
   * @description to get insurance type
   */
  getInsuranceType(data) {
    console.log(data);
    this.isInsuranceType = true

  }
  /**
   * 
   * @param data 
   * @description to get Insurance according to their type
   */
  getInsuranceName(data) {
    console.log(data);

  }

  /**
   * 
   * @param data 
   * @description select multiple owners
   */
  selectionChanged(data) {
    console.log(data);

  }


  /**
   * 
   * @param data 
   * @description to choose Logo and preview
   */
  chooseLogo(event) {
    console.log(event.target.files)
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileUrl = reader.result
        this.AddCompanyStep1.controls['compLogo'].setValue(this.fileUrl);
      };
      console.log(event.target.files[0]['name']);
      this.fileName = event.target.files[0]['name'];
      console.log(this.fileName);

      this.fileName = new FormData();
      this.fileName.append('file', event.target.files[0], event.target.files[0]['name']);

    }
  }

  /**
   * 
   * @param data 
   * @description choose documents of agreements
   */
  chooseDocument(event) {

    console.log(event.target.files)
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.docfileUrl = URL.createObjectURL(event.target.files[0]) + '.pdf';
      };
      this.docfile = event.target.files[0]['name'];
      this.docfile = new FormData();
      this.docfile.append('file', event.target.files[0], event.target.files[0]['name'])
    }
  }

  /**
   * 
   * @param data 
   * @description edit preview form 
   */
  editPreviewForm(data) {
    this.AddCompanyStep4.controls[data].enable();
    document.getElementById(data).focus();

  }



  /**
   * 
   * @param data 
   * @description to add a company 
   */
  addCompany() {

  }

}
