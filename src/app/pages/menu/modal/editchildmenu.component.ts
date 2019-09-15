import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalservice/http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalformService } from '../../../globalservice/globalform.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Imenu } from '../model/menu.model';
import { ShareService } from '../../../globalservice/share.service';

@Component({
  selector: 'ngx-editchildmenu',
  templateUrl: './editchildmenu.component.html',
  styleUrls: ['./editchildmenu.component.scss']
})
export class EditchildmenuComponent implements OnInit {

  EditChildMenu: FormGroup
  child_menu_data: any;
  parent_datas:Imenu[] = [];
  id = this.share.getdata().data._id;
  constructor(private httpcall: HttpService,private activeModal: NgbActiveModal,private share:ShareService, public formservice: GlobalformService) { 

    this.EditChildMenu = new FormGroup({
      'parentId': new FormControl('', [Validators.required]),
      'title': new FormControl(null, [Validators.required]),
      'link': new FormControl(null, [Validators.required]),
      'icon': new FormControl(null, [Validators.required])
    })
    console.log(this.activeModal);
    
  }

  ngOnInit() {
    this.getParentMenuData();
    console.log(this.share.getdata().data);
    this.child_menu_data = this.share.getdata().data; 
    this.EditChildMenu.setValue({
      parentId: this.child_menu_data.parentId,
      title:this.child_menu_data.title,
      link:this.child_menu_data.link,
      icon:this.child_menu_data.icon,
    })

   
    
  }

  getParentMenuData() {
    this.httpcall.sendHttpCall('', '/api/menus/all', 'get').subscribe((res: Imenu[]) => {
      console.log(res);
      this.parent_datas = res;

    }, (err) => {
      console.log(err);
    })
  }

  editChileMenu(){
    console.log(this.EditChildMenu.value);
   
    if(this.EditChildMenu.valid){      
      let id = this.id;      
      let body = {
        parentId: this.EditChildMenu.value.parentId,
        title: this.EditChildMenu.value.title,
        link: this.EditChildMenu.value.link,
        icon: this.EditChildMenu.value.icon,
        isParent: 'false',
        isChild: 'true',
      }

      this.httpcall.sendHttpCall(body,`/api/menus/childmenu/${id}`,'put').subscribe((res)=>{

        this.activeModal.close();

      },(err)=>{
        console.log(err);
        
      })
    }
    
  }

}
