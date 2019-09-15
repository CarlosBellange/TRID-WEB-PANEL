import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../globalservice/http.service';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit {

  AddCity: FormGroup;
  country_datas: any[] = [];

  constructor(private httpcall: HttpService, public formservice: GlobalformService, public activeModal: NgbActiveModal) {
    this.AddCity = new FormGroup({
      'country_id': new FormControl('', [Validators.required]),
      'en': new FormControl(null, [Validators.required]),
      'su': new FormControl(null, [Validators.required])     

    })
  }

  ngOnInit() {
    this.getAllCountry();
  }

  getAllCountry() {
    this.httpcall.sendHttpCall('', '/api/countries/all', 'get').subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        let obj = {
          en : element.countryName.en,
          su : element.countryName.su,
          _id: element._id
        }
        this.country_datas.push(obj)
        console.log(this.country_datas);        
      });
    }, (err) => {
      console.log(err);
    })
  }

  getCityId(e){
    console.log(e.target.val);
    
  }

  addCity(){
    console.log(this.AddCity.value)
    if(this.AddCity.valid){
      let body = {
        cityName:{
          en:this.AddCity.value.en,
          su:this.AddCity.value.su
        },
        country:this.AddCity.value.country_id,
        status:"1"
      }
      console.log('asaasasassasasaassaa',body);
      
      this.httpcall.sendHttpCall(body,'/api/cities/','post').subscribe((res)=>{
        this.activeModal.close();
      },(err)=>{
        console.log(err);
        
      })
    } else {
      this.formservice.validateAllFormFields(this.AddCity);
    }
  }

}
