import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { CompanyChatComponent } from './company-chat.component';


const routes: Routes = [{
  path: '',
  component: ChatComponent,
  children: [
      {
          path: '',
          redirectTo: 'companyChats',
      },
      {
          path: 'companyChats',
          component: CompanyChatComponent,
      },]
    }]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule { }

export const routedComponents = [
  ChatComponent,
  CompanyChatComponent
];
