import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { DataService } from 'src/app/services/data.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss']
})
export class LeftSideComponent implements OnInit {

  rooms: Room[] = [];

  constructor(private dataService: DataService, private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.websocketService.messagesSubject.subscribe(
      msg => { if(msg.wsMessageType === Constants.typeRoom) { this.addNewRoomToDisplay(msg) } }
    );
  }

  private addNewRoomToDisplay(msg: any){
    let room = new Room();
    room.toEMail = msg.wsMessageBody.toEMail;
    room.roomKey = msg.wsMessageBody.roomKey;
    room.roomName = msg.wsMessageBody.roomName === Constants.opposite ? room.toEMail : msg.wsMessageBody.roomName;
    this.rooms.push(room);
    this.dataService.rooms.push(room);
  }

}
