import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './component/job.component';
import { ComplaintComponent } from './component/complaint.component';
import { CompletedJobComponent } from './component/completed-job.component';
import { FutureJobComponent } from './component/future-job.component';
import { OngoingJobComponent } from './component/ongoing-job.component';
import { RespondJobComponent } from './component/respond-job.component';
import { CompletedJobdetailsComponent } from './component/completed-jobdetails.component';
import { FutureJobdetailsComponent } from './component/future-jobdetails.component';
import { CreateAssignJobComponent } from './component/create-assign-job.component';
import { CreateAssignJobDetailsComponent } from './component/create-assign-job-details.component';
import { CreateJobComponent } from './modal/create-job.component';
import { AssignJobComponent } from './component/assign-job.component';
import { ImportWorkerComponent } from './component/import-worker.component';
import { EditJobComponent } from './modal/edit-job.component';

const routes: Routes = [{
  path: '',
  component: JobComponent,
  children: [
      {
          path: '',
          redirectTo: 'list',
      }, 
      {
        path: 'Create-assign-job',
        component: CreateAssignJobComponent,
      },  
      {
        path:'Create-assign-job-details',
        component:CreateAssignJobDetailsComponent,
      },   
      {
          path: 'Ongoing-jobs',
          component: OngoingJobComponent,
      },
      {
          path: 'Future-jobs',
          component: FutureJobComponent,
         
      },
      {
        path: 'future-job-details',
        component:FutureJobdetailsComponent,
      },
      {
          path: 'Completed-jobs',
          component:CompletedJobComponent,
      },
      {
        path:'Completed-job-details',
        component:CompletedJobdetailsComponent
      },
      {
        path: 'No-respond-job',
        component:RespondJobComponent,
      },
      {
        path: 'Complaints',
        component:ComplaintComponent,
      },
      {
        path: 'assign-Job',
        component:AssignJobComponent,
      },
      {
        path: 'import-worker',
        component: ImportWorkerComponent,
      }
     
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule { }

export const routedComponents = [
  JobComponent,
  CreateAssignJobComponent,
  CreateAssignJobDetailsComponent,
  OngoingJobComponent,
  FutureJobComponent,
  CompletedJobComponent,
  RespondJobComponent,
  ComplaintComponent,
  CompletedJobdetailsComponent,
  FutureJobdetailsComponent,
  CreateJobComponent,
  EditJobComponent
];