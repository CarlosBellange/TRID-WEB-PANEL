import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
        title: 'Role Name(en)',
      },
      su: {
        title: 'Role Name(su)',
      },



    },

    // mode: 'external',

  };

  source: LocalDataSource = new LocalDataSource();
  isEnable: boolean = false;
  data: any[] = [];
  constructor(private httpcall: HttpService, public router: Router) { }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {

    this.httpcall.sendHttpCall('', '/api/roles/all', 'get').subscribe((res) => {
      // console.log(res);
      res = res || [];
      res.forEach(element => {
        let obj = {
          en: element.name.en,
          su: element.name.su,
          _id: element._id
        }
        this.data.push(obj);
      });


      this.source.load(this.data);
    }, (err) => {
      console.log(err);

    })
    

  }

  create(e) {
    console.log(e);
    if (e.newData) {
      let body = {
        name: {
          en: e.newData.en,
          su: e.newData.su,
        },
        status: 'true'
      }

      console.log(body);

      this.httpcall.sendHttpCall(body, '/api/roles', 'post').subscribe((res) => {
        // this.getRoles();
        e.confirm.resolve();
        // console.log(res);
        
      }, (err) => {
        console.log(err);
        e.confirm.reject();
      })

    } else {
      console.log('Please enter data!');
    }

  }

  edit(e) {
    
    if (e.newData) {
      let id = e.newData._id;

      let body = {
        name: {
          en: e.newData.en,
          su: e.newData.su,
        },
        status: 'true'
      }

      this.httpcall.sendHttpCall(body, `/api/roles/${id}`, 'put').subscribe((res) => {
        console.log(res);
        e.confirm.resolve();
        
        // this.getRoles();
      }, (err) => {
        console.log(err);
        e.confirm.reject();

      })

    } else {
      console.log('Please enter data!');
      
    }

  }

  onDeleteConfirm(e): void {
    console.log(e.data._id);
    
    if(window.confirm('Are you sure you want to delete?')){
      console.log(e.data.title);
      let id = e.data._id;
      this.httpcall.sendHttpCall('',`/api/roles/${id}`,'delete').subscribe((res)=>{
        console.log(res);
        // this.getRoles();
        e.confirm.resolve();
      },(err)=>{
        console.log(err);
        e.confirm.reject();
      })
    }
  }

}
