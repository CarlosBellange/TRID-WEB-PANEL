import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './component/customer.component';
import { PrivatelistComponent } from './component/privatelist.component';
import { GovernmentlistComponent } from './component/governmentlist.component';
import { CompanylistComponent } from './component/companylist.component';
import { AddCustomerComponent } from './component/add-customer/add-customer.component';


const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children: [
    {
      path: '',
      redirectTo: 'list'
    },
    {
      path : 'Private-customer-list',
      component : PrivatelistComponent
    },
    {
      path : 'Company-customer-list',
      component : CompanylistComponent
    },
    {
      path : 'Government-customer-list',
      component : GovernmentlistComponent
    },
    {
      path:'add-customer',
      component:AddCustomerComponent
    }
  ]
}];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

export const routedComponents = [
  CustomerComponent,
  PrivatelistComponent,
  CompanylistComponent,
  GovernmentlistComponent,
  AddCustomerComponent
];