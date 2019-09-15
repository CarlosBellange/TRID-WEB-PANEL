import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './component/service.component';
import { ServicelistComponent } from './component/servicelist.component';
import { AddserviceComponent } from './modal/addservice.component';
import { EditserviceComponent } from './modal/editservice.component';
import { SubserviceComponent } from './component/subservice.component';
import { AddsubserviceComponent } from './modal/addsubservice.component';
import { EditsubserviceComponent } from './modal/editsubservice.component';

const routes: Routes = [{
    path: '',
    component: ServiceComponent,
    children: [
        {
            path: '',
            redirectTo: 'list',
        },
        {
            path: 'list',
            component: ServicelistComponent,
        },
        {
            path: 'subservicelist',
            component: SubserviceComponent,
        },
    ],

}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ServiceRoutingModule {

}

export const routedComponents = [
    ServiceComponent,
    ServicelistComponent,
    AddserviceComponent,
    EditserviceComponent,
    SubserviceComponent,
    AddsubserviceComponent,
    EditsubserviceComponent
    
]