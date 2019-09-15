import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './component/company.component';
import { ComapnydetailsComponent } from './component/comapnydetails.component';
import { CompanylistComponent } from './component/companylist.component';
import { AddCompanyComponent } from './component/add-company.component';
import { EditCompanyComponent } from './component/edit-company.component';
import { JobcategoryComponent } from '../setting/component/jobcategory.component';

const routes: Routes = [{
    path: '',
    component: CompanyComponent,
    children: [
        {
            path: '',
            redirectTo: 'list',
        },
        {
            path: 'details',
            component: ComapnydetailsComponent,
        },
        {
            path: 'list',
            component: CompanylistComponent,
        },
        {
            path: 'addCompany',
            component: AddCompanyComponent,
           
        },
        {
            path: 'editCompany',
            component: EditCompanyComponent,
           
        },
        
    ],
    
}];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CompanyRoutingModule {



}
export const routedComponents = [
    CompanyComponent,
    ComapnydetailsComponent,
    CompanylistComponent,
    AddCompanyComponent,
    EditCompanyComponent
    
];