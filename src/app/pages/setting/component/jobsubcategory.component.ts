import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from '../../../globalservice/share.service';
import { NbToastrService, NbToastRef } from '@nebular/theme';
import { AddJobsubcategoryComponent } from '../modal/add-jobsubcategory.component';
import { EditJobsubcategoryComponent } from '../modal/edit-jobsubcategory.component';

@Component({
  selector: 'ngx-jobsubcategory',
  templateUrl: './jobsubcategory.component.html',
  styleUrls: ['./jobsubcategory.component.scss']
})
export class JobsubcategoryComponent implements OnInit {

  jobSubCategory: any[] = [];
  jobCategory: any[] = [];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: false
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      en: {
        title: 'Job Sub Category Name (en)',
        type: 'string',
      },
      su: {
        title: 'Job Sub Category Name (su)',
        type: 'string',
      },
      description:{
        title: 'Sub Category Description',
        type: 'string',
      }

    },
    mode: 'external',
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private httpcall: HttpService, private modalService: NgbModal, private shareservice: ShareService, private toastrService: NbToastrService) { }
  

  ngOnInit() {
    // this.getAllJobcategory();
    this.getAllJobSubcategory();
  }

  /**
   * 
   */

  getAllJobSubcategory() {
    this.httpcall.sendHttpCall('', '/api/jobs/allSubCategory', 'get').subscribe((res) => {
      res.forEach(element => {
        let obj = {
          en: element.name.en,
          su: element.name.su,
          _id: element._id,
          description: element.description,
          parentCategoryId: element.parentCategoryId,
          __v: element.__v,
        }

        this.jobSubCategory.push(obj);
        this.source.load(this.jobSubCategory);
        
      });

    }, (err) => {
      console.log(err);

    })
  }

  openaddmodal() {
    this.modalService.open(AddJobsubcategoryComponent, {}).result.then((res) => {
      this.jobSubCategory = [];
      this.getAllJobSubcategory();
    })
  }



  edit(e) {
// setdata(e) is a promice which sets the value
    this.shareservice.setdata(e).then((res) => {
      
      const emd = this.modalService.open(EditJobsubcategoryComponent, {}).result.then((res) => {
        this.jobSubCategory = [];
        this.getAllJobSubcategory();
      }, (err) => {

      })
    }, (err) => {

    })

  }

  delete(e) {
    this.jobSubCategory = [];
    let id = e.data._id;
    
    if (confirm("Are you sure want to delete this sub category?")) {

      this.httpcall.sendHttpCall('', `/api/jobs/deleteSubCategory/${id}`, 'put').subscribe((res) => {
        const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });

        this.getAllJobSubcategory();
      }, (err) => {
        console.log(err);
        const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Error', { duration: 3000 });

      })
    }
  }

}
