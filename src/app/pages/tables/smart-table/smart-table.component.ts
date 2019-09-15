import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { GlobalformService } from '../../../globalservice/globalform.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SmartTableComponent implements OnInit,AfterViewInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

source: LocalDataSource = new LocalDataSource();
isEnable:boolean = false;
data=[];
  constructor(private service: SmartTableData, private globalService: GlobalformService) {

   

//  var promise = new Promise((resolve, reject) => {
   
//   resolve()
// });
// promise.then(success=>{
//  // this.dismiss()
//  this.isEnable = true;
//  this.source.load(this.data)
// })

    // let data = [{
    //   id: 1,
    //   firstName: 'Mark',
    //   lastName: 'Otto',
    //   username: '@mdo',
    //   email: 'mdo@gmail.com',
    //   age: '28',
    // }]

    //console.log(data);
   
    
  }

  ngOnInit(){
    this.globalService.getState().subscribe((success) => {
      
      this.data = success;
      console.log(success);
      this.source.load(this.data)
      this.isEnable = true;
    }, (err) => {
      console.log(err);

    })
  }
  ngAfterViewInit(): void {
   
    
  }



  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
