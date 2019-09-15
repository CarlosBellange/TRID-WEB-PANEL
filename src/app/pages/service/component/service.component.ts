import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddserviceComponent } from '../modal/addservice.component';
import { HttpService } from '../../../globalservice/http.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../globalservice/share.service';

@Component({
  selector: 'ngx-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private httpcall: HttpService,
    public router: Router,
    private shareservice: ShareService
  ) { }

  ngOnInit() {

  }




}
