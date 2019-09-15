import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../globalservice/share.service';
import { HttpService } from '../../../globalservice/http.service';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  createJob: FormGroup;
  companyData: any[] = [];
  jobCategory_datas: any[] = [];
  jobSubCategory_datas: any[] = [];
  jobData: any;
  
  constructor(
    private httpcall: HttpService,
     public formservice: GlobalformService,
      public activeModal: NgbActiveModal,
     private share: ShareService,
  ) { 

    this.jobData = this.share.getdata();
    console.log(this.jobData);
    this.createJob = new FormGroup({
      'companyId': new FormControl('', [Validators.required]),
      'jobName': new FormControl('', [Validators.required]),
      'jobCategoryId': new FormControl('', [Validators.required]),
      'jobSubCategoryId': new FormControl(''),
      'jobDescription': new FormControl('', [Validators.required]),
    })
  
    this.getAllCompanyList();
    this.getAllJobcategory();
    
  }

  ngOnInit() {
    
    this.getJobSubCategoryByJobId(this.jobData.data.category._id);
    this.createJob.setValue({
      companyId: this.jobData.data.companyId,
      jobName: this.jobData.data.jobName,
      jobCategoryId: this.jobData.data.category._id,
      jobSubCategoryId: this.jobData.data.subCategory._id,
      jobDescription: this.jobData.data.jobDescription,
    });
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

  updateJob(){
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
      
      this.httpcall.sendHttpCall(body,`/api/jobs/updateJob/${this.jobData.data._id}`,'put').subscribe((res)=>{
        this.activeModal.close();
      },(err)=>{
        console.log(err);
        
      })
    } else {
      this.formservice.validateAllFormFields(this.createJob);
    }
  }

}
