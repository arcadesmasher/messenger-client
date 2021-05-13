import { Component, Input, OnInit } from '@angular/core';
import { IChatMessage } from 'src/app/interfaces/chatmessage.interface';
import { IWSMessage } from 'src/app/interfaces/wsmessage.interface';
import { Room } from 'src/app/models/room.model';
import { DataService } from 'src/app/services/data.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Constants } from 'src/app/shared/constants';
import { Now } from 'src/app/shared/now';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private _room: Room = { roomKey: "", roomName: "" , toEMail: ""};
  private _message: string = "";
  private _messageStack: string = "";

  constructor(private dataService: DataService, private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.dataService.lastChosenRoomSubject.subscribe(
      room => { this.room = room }
    );
    this.websocketService.messagesSubject.subscribe(
      msg => { if(msg.wsMessageType === Constants.typeChat) { this.publishMessage(msg) } }
    );
  }

  private async publishPreviousMessages(){
    this.messageStack = "";
    let previousMessagesResult = await this.dataService.getPreviousMessages(this.room.roomKey);
    if(previousMessagesResult.length > 0){
      for(const previousMessage of previousMessagesResult){
        console.log(previousMessage)
        let time = previousMessage.createdAt;
        let message = previousMessage.message;
        let from = previousMessage.email === this.dataService.loggedInEMail ? Constants.you : previousMessage.email;
        this.messageStack += "[" + time + "]" + " " + from + ": " + message + "\r\n";
      }
    }
  }

  private publishMessage(msg: IWSMessage){
    let body = msg.wsMessageBody as IChatMessage;
    if(body.toRoom === this.room.roomKey){
      let time = msg.wsMessageDate;
      let from = body.fromEMail === this.dataService.loggedInEMail ? Constants.you : body.fromEMail;
      this.messageStack += "[" + time + "]" + " " + from + ": " + body.messageText + "\r\n";
    }
  }

  sendMessage(){
    let chatMessage: IChatMessage = { fromEMail: this.dataService.loggedInEMail, toRoom: this.room.roomKey, messageText: this.message };
    let message: IWSMessage = { wsMessageType: "chat", wsMessageBody: chatMessage, wsMessageDate: Now.getNow() };
    this.websocketService.sendWSMessage(message);
  }

  //#region Get - Set

  get message(): string {
    return this._message;
  }
  set message(value: string) {
    this._message = value;
  }

  public get room(): Room {
    return this._room;
  }
  @Input()
  public set room(value: Room) {
    this._room = value;
    this.publishPreviousMessages();
  }

  public get messageStack(): string {
    return this._messageStack;
  }
  public set messageStack(value: string) {
    this._messageStack = value;
  }

  //#endregion

}
