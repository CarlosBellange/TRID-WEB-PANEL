import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkerComponent } from './component/worker.component';
import { WorkerlistComponent } from './component/workerlist.component';
import { AddworkerComponent } from './component/addworker.component';
import { WorkerdetailsComponent } from './component/workerdetails.component';
import { EditWorkerComponent } from './component/edit-worker.component';
import { AddWorkerFromCompanyListComponent } from './component/add-worker-from-company-list.component';


const routes: Routes = [{
    path: '',
    component: WorkerComponent,
    children: [
        {
            path: '',
            redirectTo: 'list',
        },        
        {
            path: 'list',
            component: WorkerlistComponent,
        },
        {
            path: 'addWorker',
            component: AddworkerComponent,
           
        },
        {
            path: 'details',
            component:WorkerdetailsComponent,
        },
        {
            path: 'edit',
            component:EditWorkerComponent,
        },
        {
            path: 'addWokerCompany',
            component:AddWorkerFromCompanyListComponent,
        },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class WorkerRoutingModule { }

export const routedComponents = [
    WorkerComponent,
    WorkerlistComponent,
    AddworkerComponent,
    WorkerdetailsComponent,
    AddWorkerFromCompanyListComponent
];