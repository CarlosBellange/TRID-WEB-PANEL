import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component'; 
import { routedComponents, ChatRoutingModule } from './chat-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { CompanyChatComponent } from './company-chat.component';
import { NbToastrModule, NbDialogModule, NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    ThemeModule,
    ChatRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  exports:[...routedComponents],
  entryComponents:[...routedComponents]
})
export class ChatModule { }
