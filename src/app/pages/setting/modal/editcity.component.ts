import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../globalservice/http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareService } from '../../../globalservice/share.service';
import { GlobalformService } from '../../../globalservice/globalform.service';

@Component({
  selector: 'ngx-editcity',
  templateUrl: './editcity.component.html',
  styleUrls: ['./editcity.component.scss']
})
export class EditcityComponent implements OnInit {

  EditCity: FormGroup;
  city_data: any;
  country_datas: any[] = [];
  id = this.share.getdata().data._id;


  constructor(private httpcall: HttpService, public formservice: GlobalformService, public activeModal: NgbActiveModal, private share: ShareService) {
    this.EditCity = new FormGroup({
      'country_id': new FormControl('', [Validators.required]),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required])

    })
  }

  ngOnInit() {
    this.getAllCountry();
    // getdata() is a promice that returns the value which is set in the setdata
    this.city_data = this.share.getdata().data;
    
    // setValue is use to set the value to the form control
    this.EditCity.setValue({
      en: this.city_data.en,
      su: this.city_data.su,
      country_id: this.city_data.country_id,
    });
  }

  getAllCountry() {
    this.httpcall.sendHttpCall('', '/api/countries/all', 'get').subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        let obj = {
          en: element.countryName.en,
          su: element.countryName.su,
          _id: element._id,
          // country_id:element.country.country_id,
        }
        this.country_datas.push(obj)
        
      });
    }, (err) => {
      console.log(err);
    })
  }

  editCity() {
    
    let id = this.id;
    let body = {
      cityName: {
        en: this.EditCity.value.en,
        su: this.EditCity.value.su
      },
      country: this.EditCity.value.country_id,
      status: "1"
    }

    this.httpcall.sendHttpCall(body, `/api/cities/${id}`, 'put').subscribe((res) => {
      this.activeModal.close();
    }, (err) => {
      console.log(err);

    })




  }

}
