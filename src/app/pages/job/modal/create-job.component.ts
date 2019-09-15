import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../globalservice/http.service';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'ngx-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent implements OnInit {

  createJob: FormGroup;
  companyData: any[] = [];
  jobCategory_datas: any[] = [];
  jobSubCategory_datas: any[] = [];
  // userDetails: any = "company";
  userDetails: any;

  constructor(private httpcall: HttpService,
    public formservice: GlobalformService,
    public activeModal: NgbActiveModal) {

    this.userDetails = JSON.parse(localStorage.getItem("user_data"));

    this.getAllCompanyList();
    this.getAllJobcategory();
  }

  ngOnInit() {

    if(this.userDetails.roleName == "company"){
            this.createJob = new FormGroup({
              'companyId': new FormControl({value: '', disabled: true}, [Validators.required]),
              'jobName': new FormControl('', [Validators.required]),
              'jobCategoryId': new FormControl('', [Validators.required]),
              'jobSubCategoryId': new FormControl(''),
              'jobDescription': new FormControl('', [Validators.required]),
            });
            
          }else{
          this.createJob = new FormGroup({
            'companyId': new FormControl('', [Validators.required]),
            'jobName': new FormControl('', [Validators.required]),
            'jobCategoryId': new FormControl('', [Validators.required]),
            'jobSubCategoryId': new FormControl(''),
            'jobDescription': new FormControl('', [Validators.required]),
          });
        }
  }

  ngAfterViewInit(){
    if(this.userDetails.roleName == "company"){
      this.createJob.setValue({
        companyId: this.userDetails['userId'],
        jobName: null,
        jobCategoryId: null,
        jobSubCategoryId: null,
        jobDescription: null,
      });
    }
  }

  getAllCompanyList() {
    this.httpcall.sendHttpCall('', '/api/companyProfiles/all', 'get').subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        let obj = {
          _id: element._id,
          compName: element.compName,
        }
        this.companyData.push(obj)
        // console.log(this.companyData);        
      });
    }, (err) => {
      console.log(err);
    })
  }

  getAllJobcategory() {
    this.httpcall.sendHttpCall('', '/api/jobs/allCategory', 'get').subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        let obj = {
          en: element.name.en,
          su: element.name.su,
          _id: element._id,
          description: element.description,
        }
        this.jobCategory_datas.push(obj)
            
      });
    }, (err) => {
      console.log(err);
    })
  }

  getJobSubCategoryByJobId(e){
    console.log(e);
    
    this.httpcall.sendHttpCall('', `/api/jobs/getSubcategoryByCategoryId/${e}`, 'get').subscribe((res) => {
      
      console.log(res);
      this.jobSubCategory_datas = [];
      res.forEach(element => {
        let obj = {
          en: element.name.en,
          su: element.name.su,
          _id: element._id,
          description: element.description,
          parentCategoryId: element.parentCategoryId,
          __v: element.__v,
        }
        this.jobSubCategory_datas.push(obj)
        console.log(this.jobSubCategory_datas);        
      });
    }, (err) => {
      console.log(err);
    })
  }

  addJob(){
    // console.log(this.createJob.value)
    if(this.createJob.valid){
      let body = {
        companyId: this.createJob.value.companyId,
        jobName: this.createJob.value.jobName,
        category: this.createJob.value.jobCategoryId,
        subCategory: this.createJob.value.jobSubCategoryId,
        jobDescription: this.createJob.value.jobDescription,
        
      }
      // console.log('asaasasassasasaassaa',body);
      
      this.httpcall.sendHttpCall(body,'/api/jobs/saveJob','post').subscribe((res)=>{
        this.activeModal.close();
      },(err)=>{
        console.log(err);
        
      })
    } else {
      this.formservice.validateAllFormFields(this.createJob);
    }
  }

}
