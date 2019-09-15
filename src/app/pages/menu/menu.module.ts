import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routedComponents, MenuRoutingModule } from './menu-routing-module';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesModule } from '../tables/tables.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbToastrModule, NbDialogModule, NbThemeModule } from '@nebular/theme';
import {ShareService} from '../../globalservice/share.service';
@NgModule({
  declarations: [...routedComponents ],
  imports: [
    CommonModule,
    ThemeModule,
    TablesModule,
    Ng2SmartTableModule,
    MenuRoutingModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    
  ],
  entryComponents:[...routedComponents],
  providers:[ShareService]
})
export class MenuModule { }
