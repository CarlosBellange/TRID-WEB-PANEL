import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule, routedComponents } from './setting-routing-module';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesModule } from '../tables/tables.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RoleComponent } from './component/role.component';
import { MenumapComponent } from './component/menumap.component';
import { CountryComponent } from './component/country.component';
import { JobcategoryComponent } from './component/jobcategory.component';
import { JobsubcategoryComponent } from './component/jobsubcategory.component';
import { AddJobsubcategoryComponent } from './modal/add-jobsubcategory.component';
import { EditJobsubcategoryComponent } from './modal/edit-jobsubcategory.component';

@NgModule({
  declarations: [...routedComponents, RoleComponent, MenumapComponent, CountryComponent, JobcategoryComponent, JobsubcategoryComponent, EditJobsubcategoryComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ThemeModule,
    TablesModule,
    Ng2SmartTableModule,
  ],
  entryComponents:[...routedComponents]
})
export class SettingModule { }
