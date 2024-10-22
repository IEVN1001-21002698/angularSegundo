import { Component } from '@angular/core';
import { MessageserviceService } from '../messageservice.service';

@Component({
  selector: 'app-list-message',
  standalone: true,
  imports: [],
  templateUrl: './list-message.component.html',
  styles: ``
})
export class ListMessageComponent {

  constructor(public messageService:MessageserviceService) { }

  
}
