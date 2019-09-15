import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../../../globalservice/http.service';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from '../../../globalservice/share.service';

@Component({
  selector: 'ngx-edit-jobsubcategory',
  templateUrl: './edit-jobsubcategory.component.html',
  styleUrls: ['./edit-jobsubcategory.component.scss']
})
export class EditJobsubcategoryComponent implements OnInit {
 
  subCategoryData: any;
  editSubcategory: FormGroup;
  subCategory_datas: any[] = [];
  id: any;

  constructor(private httpcall: HttpService, public formservice: GlobalformService, public activeModal: NgbActiveModal, private share: ShareService) {
    this.editSubcategory = new FormGroup({
      'parentCategoryId': new FormControl('', [Validators.required]),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),    

    })
  }

  ngOnInit() {

    this.getAllJobcategory();

    this.subCategoryData = this.share.getdata().data;
    
    this.id = this.share.getdata().data._id;

    this.editSubcategory.setValue({
      parentCategoryId: this.subCategoryData.parentCategoryId,
      en: this.subCategoryData.en,
      su: this.subCategoryData.su,
      description: this.subCategoryData.description,
    });
    
  }

  getAllJobcategory() {
    this.httpcall.sendHttpCall('', '/api/jobs/allCategory', 'get').subscribe((res) => {
      
      res.forEach(element => {
        let obj = {
          en: element.name.en,
          su: element.name.su,
          _id: element._id,
          description: element.description,
        }
        this.subCategory_datas.push(obj)
        
      });
    }, (err) => {
      console.log(err);
    })
  }

  getCityId(e){
    console.log(e.target.val);
    
  }

  editJobSubCategory(){
    
    if(this.editSubcategory.valid){
      let id = this.id;
      let body = {
        subCategoryName:{
          en:this.editSubcategory.value.en,
          su:this.editSubcategory.value.su,
        },
        description:this.editSubcategory.value.description,
        parentCategoryId:this.editSubcategory.value.parentCategoryId,
        status:"true",
      }
      
      
      this.httpcall.sendHttpCall(body, `/api/jobs/updateSubCategory/${id}`, 'put').subscribe((res) => {
        this.activeModal.close();
      }, (err) => {
        console.log(err);
      })
    } else {
      this.formservice.validateAllFormFields(this.editSubcategory);
    }
  }

}
