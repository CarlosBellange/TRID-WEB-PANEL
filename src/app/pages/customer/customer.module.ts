import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { PrivatelistComponent } from './component/privatelist.component';
import { CompanylistComponent } from './component/companylist.component';
import { GovernmentlistComponent } from './component/governmentlist.component';
import { CustomerComponent } from './component/customer.component';
import { CustomerRoutingModule, routedComponents } from './customer-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    ...routedComponents,
    PrivatelistComponent, 
    CompanylistComponent, 
    GovernmentlistComponent, 
    CustomerComponent, 
  ],
  imports: [
    CommonModule,
    ThemeModule,
    CustomerRoutingModule,
    Ng2SmartTableModule
  ],
  exports:[...routedComponents]
})
export class CustomerModule { }
