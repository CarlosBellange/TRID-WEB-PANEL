import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../globalservice/http.service';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-add-jobsubcategory',
  templateUrl: './add-jobsubcategory.component.html',
  styleUrls: ['./add-jobsubcategory.component.scss']
})
export class AddJobsubcategoryComponent implements OnInit {

  addSubcategory: FormGroup;
  subCategory_datas: any[] = [];

  constructor(private httpcall: HttpService, public formservice: GlobalformService, public activeModal: NgbActiveModal) {
    this.addSubcategory = new FormGroup({
      'parentCategoryId': new FormControl('', [Validators.required]),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),    

    })
  }

  ngOnInit() {
    this.getAllJobcategory();
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
        this.subCategory_datas.push(obj)
        console.log(this.subCategory_datas);        
      });
    }, (err) => {
      console.log(err);
    })
  }

  // getCityId(e){
  //   console.log(e.target.val);
    
  // }

  addJobSubCategory(){
    console.log(this.addSubcategory.value)
    if(this.addSubcategory.valid){
      let body = {
        subCategoryName:{
          en:this.addSubcategory.value.en,
          su:this.addSubcategory.value.su,
        },
        description:this.addSubcategory.value.description,
        parentCategoryId:this.addSubcategory.value.parentCategoryId,
        status:"true",
      }
      console.log('asaasasassasasaassaa',body);
      
      this.httpcall.sendHttpCall(body,'/api/jobs/saveSubCategory','post').subscribe((res)=>{
        this.activeModal.close();
      },(err)=>{
        console.log(err);
        
      })
    } else {
      this.formservice.validateAllFormFields(this.addSubcategory);
    }
  }

}
