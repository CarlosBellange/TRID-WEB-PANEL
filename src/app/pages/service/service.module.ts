import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesModule } from '../tables/tables.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbToastrModule, NbDialogModule, NbThemeModule} from '@nebular/theme';
import { routedComponents, ServiceRoutingModule } from './service-routing-module';
import { ShareService } from '../../globalservice/share.service';



@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ThemeModule,
    TablesModule,
    ServiceRoutingModule,
    Ng2SmartTableModule,
    NbToastrModule,
    NbDialogModule,
    NbThemeModule,

  ],
  entryComponents:[...routedComponents],
  providers:[ShareService]
  
})
export class ServiceModule { }
