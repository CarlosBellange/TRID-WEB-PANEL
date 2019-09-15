import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../globalservice/http.service';
import { ShareService } from '../../globalservice/share.service';

@Component({
  selector: 'ngx-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private httpcall: HttpService,
    public router: Router,
    private shareservice: ShareService
  ) { }

  ngOnInit() {
  }

}
