import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service'
import { Router } from '@angular/router';
import { Imenu } from '../model/menu.model';
import { NbToastRef,NbToastrService } from '@nebular/theme';
// NbToastRef

@Component({
  selector: 'ngx-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {

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
      title: {
        title: 'Menu Name',
        type: 'string',
      },
      link: {
        title: 'Menu Link',
        type: 'string',
      },
      icon: {
        title: 'Icon',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  isEnable: boolean = false;
  data: Imenu[] = [];

  constructor(private globalSevice: GlobalformService,private toastrService:NbToastrService, private httpcall: HttpService, public router: Router) { }

  ngOnInit() {    
    this.getMenuLIst();
  }

  onDeleteConfirm(event): void {

    if (window.confirm('Are you sure you want to delete?')) {
      let id = event.data._id;
      console.log(id);      
      this.httpcall.sendHttpCall('',`/api/menus/${id}`,'delete').subscribe((res:any)=>{
        // showing toaster message
        const toastRef: NbToastRef = this.toastrService.success(res.message,'Success',{duration:3000});
        
        event.confirm.resolve();
      },(err)=>{
        console.log(err);        
        event.confirm.reject();
      });
      
    } else {
      event.confirm.reject();
    }
  }

  getMenuLIst() {
    this.httpcall.sendHttpCall('', '/api/menus/all', 'get').subscribe((res: Imenu[]) => {      
      this.data = res;
      this.source.load(this.data);
    }, (err) => {
      console.log(err);
    })
  }

  create(e) {   

    if (e.newData) {
      //api call
      let body={
        icon: e.newData.icon,
        link: e.newData.link,
        title: e.newData.title,
        group: true,
        isParent: true,
      }
      
      this.httpcall.sendHttpCall(JSON.stringify(body),'/api/menus','post').subscribe((res)=>{
        // showing toaster message
        // const toastRef: NbToastRef = this.toastrService.success(res.message,'Success',{duration:3000});
        //suscribe
        e.confirm.resolve();
      }, (err)=> {
        console.log(err);        
        // erro 
        e.confirm.reject();
      })     
     
    } else {

    }

  }

  edit(e) {
    if(e.newData){
        let id = e.newData._id;
        let body = {
          icon: e.newData.icon,
          link: e.newData.link,
          title: e.newData.title,
          group: true,
          isParent: true,
        }
      
      this.httpcall.sendHttpCall(body,`/api/menus/${id}`,'put').subscribe((res:any)=>{
        // showing toaster message
        const toastRef: NbToastRef = this.toastrService.success(res.message,'Success',{duration:3000});
        // toastRef.close();
        e.confirm.resolve();
      },(err)=>{
        console.log(err);        
        // erro 
        // const toastRef: NbToastRef = this.toastrService.show('Success',res.message,{duration:3000});
        e.confirm.reject();
      })
    } else {

    }
    


  }
}
