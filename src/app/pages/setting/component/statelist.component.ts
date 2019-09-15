import { Component, OnInit } from '@angular/core';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';



@Component({
  selector: 'ngx-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.scss']
})
export class StatelistComponent implements OnInit {

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
      statename: {
        title: 'State Name',
        type: 'string',
      },   
      
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data = [];

  constructor(private globalSevice: GlobalformService, private httpcall: HttpService) { }

  ngOnInit() {
    let data = [
      {
        id:1,
        statename: 'Stockholm'
      },
      {
        id:2,
        statename: 'Gothenburg'
      },

  ];


    this.source.load(data);
  }

  getAllCities(){
    // this.httpcall.sendHttpCall('','')
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
