import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { NbToastRef, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country: any[] = [];

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
        title: 'Country name (en)',
        type: 'string',
      },
      su: {
        title: 'Country name (su)',
        type: 'string',
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private httpcall: HttpService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getAllCities();
  }

  getAllCities() {
    this.httpcall.sendHttpCall('', '/api/countries/all', 'get').subscribe((res) => {
      res = res || [];
      console.log(res);
      res.forEach(element => {
        let obj = {
          en: element.countryName.en,
          su: element.countryName.su,
          _id: element._id
        }
        this.country.push(obj);
        console.log(obj);
        this.source.load(this.country);
        
      });

    }, (err) => {
      console.log(err);
    })
  }

  create(e) {
    console.log(e);
    let body = {
      countryName: {
        en: e.newData.en,
        su: e.newData.en
      },
      status: "1"
    }
    this.httpcall.sendHttpCall(body, '/api/countries/', 'post').subscribe((res) => {
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
      this.httpcall.sendHttpCall('', `/api/countries/${id}`, 'delete').subscribe((res) => {
        const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });
        e.confirm.resolve();
      }, (err) => {
        console.log(err);
        const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Success', { duration: 3000 });
        e.confirm.reject();
      })
    }
  }
  edit(data){

  }



}
