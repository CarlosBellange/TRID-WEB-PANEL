import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Imenu } from '../model/menu.model';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { Router } from '@angular/router';
import { HttpService } from '../../../globalservice/http.service';
import { AddchildmenuComponent } from '../modal/addchildmenu.component';
import { ModalComponent } from '../../bootstrap/modals/modal/modal.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditchildmenuComponent } from '../modal/editchildmenu.component';
import { ShareService } from '../../../globalservice/share.service';

@Component({
  selector: 'ngx-childmenulist',
  templateUrl: './childmenulist.component.html',
  styleUrls: ['./childmenulist.component.scss']
})
export class ChildmenulistComponent implements OnInit {

  

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: false,
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
      title: {
        title: 'Child Menu Name',
        type: 'string',
        editable: false,
        sort: true
      },
      link: {
        title: 'Child Menu Link',
        type: 'string',
        editable: false,
        sort: true
      },
      
    },
    mode: 'external',

  };

  source: LocalDataSource = new LocalDataSource();
  isEnable: boolean = false;
  data: Imenu[] = [];

  constructor(private globalSevice: GlobalformService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private httpcall: HttpService,
    public router: Router,
    private modalService: NgbModal,
    private shareservice: ShareService


  ) { }

  ngOnInit() {
    this.getChildMenuList();
  }

  getChildMenuList() {
    this.httpcall.sendHttpCall('', '/api/menus/childmenu/all', 'get').subscribe((res: Imenu[]) => {
      console.log(res);
      this.source.load(res);

    }, (err) => {
      console.log(err);

    });
  }


  edit(e) {
    console.log(e.data);

  }
  openaddmodal() {
    const md = this.modalService.open(AddchildmenuComponent, {}).result.then((res) => {
      this.getChildMenuList();
    })
  }

  onCustomAction(e) {
    // console.log(e);
    this.shareservice.setdata(e).then((res) => {
      const emd = this.modalService.open(EditchildmenuComponent, {}).result.then((res) => {
        this.getChildMenuList();
      }, (err) => {

      })
    }, (err) => {

    })
  }

  delete(e) {
    let id = e.data._id; 
    
    if(confirm("Are you sure want to delete this data?")) {
      this.httpcall.sendHttpCall('',`/api/menus/childmenu/${id}`,'delete').subscribe((res)=>{
        this.getChildMenuList();
      },(err)=>{
        console.log(err);
        
      })
    }

  }
}
