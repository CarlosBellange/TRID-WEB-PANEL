import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerRoutingModule, routedComponents } from './worker-routing-module';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesModule } from '../tables/tables.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MapsModule } from '../maps/maps.module';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OvertimeScheduleComponent } from './component/overtime-schedule/overtime-schedule.component';
import { EditWorkerComponent } from './component/edit-worker.component';
import { RegularScheduleComponent } from './component/regular-schedule/regular-schedule.component';
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { TemporaryScheduleComponent } from './component/temporary-schedule/temporary-schedule.component';
import { RegularScheduleDetailsComponent } from './component/regular-schedule-details/regular-schedule-details.component';



@NgModule({
  declarations: [...routedComponents, OvertimeScheduleComponent, EditWorkerComponent, RegularScheduleComponent, TemporaryScheduleComponent, RegularScheduleDetailsComponent],
  imports: [
    CommonModule,
    WorkerRoutingModule,
    ThemeModule,
    CalendarModule,
    MapsModule,
    TablesModule,
    MapsModule,
    Ng2SmartTableModule,
    SelectDropDownModule,
    AmazingTimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    UiSwitchModule
  ],
  exports:[...routedComponents]
})
export class WorkerModule { }
