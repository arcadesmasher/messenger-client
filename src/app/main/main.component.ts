import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  isAuthDone: boolean = false;

  constructor(private dataService: DataService, private websocketService: WebsocketService) {
    if(this.dataService.loggedInEMail.length !== 0){
      this.isAuthDone = true;
    }
  }

  ngOnInit(): void {
    this.websocketService.messagesSubject.subscribe(
      msg => console.log('message received: ' + JSON.stringify(msg))
    );
    this.websocketService.errorsSubject.subscribe(
      err => console.log(err)
    );
  }

}
