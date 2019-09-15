import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService, NbToastRef} from '@nebular/theme';
import { ShareService } from '../../../globalservice/share.service';

@Component({
  selector: 'ngx-jobcategory',
  templateUrl: './jobcategory.component.html',
  styleUrls: ['./jobcategory.component.scss']
})
export class JobcategoryComponent implements OnInit {

  jobCategory: any[] = [];

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      en: {
        title: 'Job Category Name (en)',
        type: 'string',
      },
      su: {
        title: 'Job Category Name (su)',
        type: 'string',
      },
      description:{
        title: 'Job Category Description',
        type: 'String',
      },

    },
    // mode: 'external',
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private httpcall: HttpService, private modalService: NgbModal, private shareservice: ShareService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getAllJobcategory();
  }

  /**
   * 
   */

  getAllJobcategory() {
    this.httpcall.sendHttpCall('', '/api/jobs/allCategory', 'get').subscribe((res) => {
      res.forEach(element => {
        let obj = {
          en: element.name.en,
          su: element.name.su,
          _id: element._id,
          description: element.description
        }

        this.jobCategory.push(obj);
        this.source.load(this.jobCategory);
        
      });

    }, (err) => {
      console.log(err);

    })
  }


  create(e) {
    console.log(e);
    let body = {
      categoryName: {
        en: e.newData.en,
        su: e.newData.su,
      },
      description: e.newData.description,
      status: "true"
    }
    this.httpcall.sendHttpCall(body, '/api/jobs/saveCategory', 'post').subscribe((res) => {
      const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
      e.confirm.resolve();
    }, (err) => {
      console.log(err);
      const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Success', { duration: 3000 });
      e.confirm.reject();
    })

  }

  onDeleteConfirm(e) {
    console.log(e);

    if (window.confirm('Are you sure you want to delete?')) {
      let id = e.data._id;
      this.httpcall.sendHttpCall('', `/api/jobs/deleteCategory/${id}`, 'put').subscribe((res) => {
        const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
        e.confirm.resolve();
      }, (err) => {
        console.log(err);
        const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Success', { duration: 3000 });
        e.confirm.reject();
      })
    }
  }

  edit(e){

    console.log(e);
    let id = e.data._id;
    let body = {
      categoryName: {
        en: e.data.en,
        su: e.data.su,
      },
      description: e.data.description,
      status: "true"
    }
    this.httpcall.sendHttpCall(body, `/api/jobs/updateCategory/${id}`, 'put').subscribe((res) => {
      const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
      e.confirm.resolve();
    }, (err) => {
      console.log(err);
      const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Success', { duration: 3000 });
      e.confirm.reject();
    })

  }

}
