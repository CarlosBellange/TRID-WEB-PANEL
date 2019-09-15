import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobRoutingModule, routedComponents } from './job-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesModule } from '../tables/tables.module';
import { MapsModule } from '../maps/maps.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { CreateAssignJobDetailsComponent } from './component/create-assign-job-details.component';
import { CreateJobComponent } from './modal/create-job.component';
import { AssignJobComponent } from './component/assign-job.component';
import { ImportWorkerComponent } from './component/import-worker.component';


@NgModule({
  declarations: [...routedComponents, CreateAssignJobDetailsComponent,CreateJobComponent, AssignJobComponent, ImportWorkerComponent,],
  imports: [
    CommonModule,
    JobRoutingModule,
    ThemeModule,
    TablesModule,
    MapsModule,
    Ng2SmartTableModule,

    SelectDropDownModule

  ],
  exports:[...routedComponents],
  entryComponents:[...routedComponents]
})
export class JobModule { }
