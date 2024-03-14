import { Component } from '@angular/core';
import { MessageService } from '../shared/service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  

  constructor(public messageService: MessageService) {}
}
