import { Component, OnInit } from '@angular/core';
import { ChatService } from '../extra-components/chat/chat.service';



@Component({
  selector: 'ngx-company-chat',
  templateUrl: './company-chat.component.html',
  // styleUrls: ['./company-chat.component.scss'],
  styles: [`
  ::ng-deep nb-layout-column {
    justify-content: center;
    }
    // nb-chat {
    //   width: 206%;
    // }
    text ng-star-inserted {
      background: #494299;
    }
  `],
  providers: [ ChatService ],
})
export class CompanyChatComponent implements OnInit {

  base64image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAG1BMVEVEeef///+4zPaKq/ChvPPn7' +
    'vxymu3Q3flbieqI1HvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVQ4jWNgGAWjgP6ASdncAEaiAhaGiACmFhCJLsMaIiDAEQEi0WXYEiMC' +
    'OCJAJIY9KuYGTC0gknpuHwXDGwAA5fsIZw0iYWYAAAAASUVORK5CYII='
  users: { name: string }[] = [
    { name: 'Carla Espinosa' },
    { name: 'Bob Kelso' },
    { name: 'Janitor' },
    { name: 'Perry Cox' },
    { name: 'Ben Sullivan' },
    { name: 'George' },
    { name: 'Thomas'},
    { name: 'Oscar'},
    { name: 'Joshua'},
    { name: 'Dylan'}
  ];

  messages: any[];

  constructor(protected chatService: ChatService) {
    this.messages = this.chatService.loadMessages();
   }

   sendMessage(event:any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });
    this.messages.push({
      text:event.messages,
      date:new Date(),
      reply:true,
      type:files.length ? 'file' : 'text',
      files:files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    const botReply = this.chatService.reply(event.message);
    if (botReply) {
      setTimeout(() => {
        this.messages.push(botReply);
      }, 500);
    }
   }

  ngOnInit() {
  }

}
