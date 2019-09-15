import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpService } from '../../../globalservice/http.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCityComponent } from '../modal/add-city.component';
import { ShareService } from '../../../globalservice/share.service';
import { NbToastRef, NbToastrService } from '@nebular/theme';
import { EditcityComponent } from '../modal/editcity.component';

@Component({
  selector: 'ngx-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  city: any[] = [];

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
        title: 'City name (en)',
        type: 'string',
      },
      su: {
        title: 'City name (su)',
        type: 'string',
      },

    },
    mode: 'external',
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private httpcall: HttpService, private modalService: NgbModal, private shareservice: ShareService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getAllCities();
  }

  /**
   * 
   */

  getAllCities() {
    this.httpcall.sendHttpCall('', '/api/cities/all', 'get').subscribe((res) => {
      res.forEach(element => {
        let obj = {
          en: element.cityName.en,
          su: element.cityName.su,
          _id: element._id,
          country_id: element.country._id
        }
        this.city.push(obj);
        this.source.load(this.city)
      });

    }, (err) => {
      console.log(err);

    })
  }


  openaddmodal() {
    this.modalService.open(AddCityComponent, {}).result.then((res) => {
      this.city = [];
      this.getAllCities();
    })
  }



  edit(e) {
// setdata(e) is a promice which sets the value
    this.shareservice.setdata(e).then((res) => {
      const emd = this.modalService.open(EditcityComponent, {}).result.then((res) => {
        this.city = [];
        this.getAllCities();
      }, (err) => {

      })
    }, (err) => {

    })

  }

  delete(e) {
    this.city = [];
    let id = e.data._id;
    console.log(id);
    if (confirm("Are you sure want to delete this city?")) {

      this.httpcall.sendHttpCall('', `/api/cities/${id}`, 'delete').subscribe((res) => {
        const toastRef: NbToastRef = this.toastrService.success(res.message, 'Success', { duration: 3000 });

        this.getAllCities();
      }, (err) => {
        console.log(err);
        const toastRef: NbToastRef = this.toastrService.danger(err.message, 'Error', { duration: 3000 });

      })
    }
  }

}
