import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule, routedComponents } from './company-routing-module';
import { CompanylistComponent } from './component/companylist.component';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesModule } from '../tables/tables.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { ShareService } from '../../globalservice/share.service';
import { MapsModule } from '../maps/maps.module';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { AmazingTimePickerModule } from 'amazing-time-picker';

@NgModule({
  declarations: [...routedComponents, CompanylistComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ThemeModule,
    TablesModule,
    Ng2SmartTableModule,
    SelectDropDownModule,
    MapsModule,
    BootstrapModule,
    AmazingTimePickerModule
  ],
  providers:[ShareService],
  
})
export class CompanyModule { }
