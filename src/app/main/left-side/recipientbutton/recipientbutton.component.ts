import { Component, Input, OnInit } from '@angular/core';
import { IChatMessage } from 'src/app/interfaces/chatmessage.interface';
import { IWSMessage } from 'src/app/interfaces/wsmessage.interface';
import { Room } from 'src/app/models/room.model';
import { AudioService } from 'src/app/services/audio.service';
import { DataService } from 'src/app/services/data.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'recipientbutton',
  templateUrl: './recipientbutton.component.html',
  styleUrls: ['./recipientbutton.component.scss']
})
export class RecipientbuttonComponent implements OnInit {

  private _newMessageExists: boolean = false;
  private _roomKey: string = "";
  private _roomName: string = "";
  private _toEMail: string = "";
  private _lastMessageFrom: string = "";
  private _lastMessageDate: string = "";
  private _lastMessageText: string = "";
  private _isOnline: boolean = false;

  constructor(private dataService: DataService, private websocketService: WebsocketService, private audioService: AudioService) {
    this.websocketService.messagesSubject.subscribe(
      (msg: IWSMessage) => { this.handleMessage(msg) }
    );
  }

  async ngOnInit() {
    await this.initOnlineStatus(this.toEMail);
    await this.initLastMessage(this.roomKey);
  }

  private handleMessage(msg: IWSMessage){
    let type = msg.wsMessageType;
    switch(type){
      case Constants.typeChat: this.changeLastMessage(msg); break;
      case Constants.typeUserOnline: this.changeOnlineStatus(msg); break;
      default: break;
    }
  }

  //#region Inits

  private async initOnlineStatus(eMail: string){
    let isUserOnlineResult = await this.dataService.checkIsUserOnline(eMail);
    if(isUserOnlineResult.isOnline){
      this.isOnline = true;
    } else {
      this.isOnline = false;
    }
  }

  private async initLastMessage(roomKey: string){
    let lastMessageResult = await this.dataService.getLastMessage(roomKey);
    if(lastMessageResult !== {}){
      this.lastMessageFrom = lastMessageResult.email !== this.toEMail ? Constants.you : lastMessageResult.email;
      this.lastMessageDate = lastMessageResult.createdAt;
      this.lastMessageText = lastMessageResult.message;
    }
  }

  //#endregion

  //#region Changes

  private changeOnlineStatus(msg: any){
    let mail = msg.wsMessageBody.eMail;
    let isOnline = msg.wsMessageBody.isOnline;
    if(mail === this.toEMail){
      this.isOnline = isOnline;
    }
  }

  private async changeLastMessage(msg: IWSMessage){
    if(msg.wsMessageBody !== undefined){
      let chatMsg = msg.wsMessageBody as IChatMessage;
      if(chatMsg.toRoom === this.roomKey){
        this.lastMessageFrom = chatMsg.fromEMail !== this.toEMail ? Constants.you : chatMsg.fromEMail;
        this.lastMessageDate = msg.wsMessageDate;
        this.lastMessageText = chatMsg.messageText;
        if(chatMsg.fromEMail === this.toEMail){
          this.audioService.newMsgSound.play();
          this.newMessageExists = true;
        }
      }
    }
  }

  changeRoom(){
    let room: Room = { roomName: this.roomName, toEMail: this.toEMail, roomKey: this.roomKey };
    this.dataService.lastChosenRoomSubject.next(room);
    this.newMessageExists = false;
  }

  //#endregion

  //#region Get - Set

  public get newMessageExists(): boolean {
    return this._newMessageExists;
  }
  public set newMessageExists(value: boolean) {
    this._newMessageExists = value;
  }

  public get roomKey(): string {
    return this._roomKey;
  }
  @Input()
  public set roomKey(value: string) {
    this._roomKey = value;
  }

  public get roomName(): string {
    return this._roomName;
  }
  @Input()
  public set roomName(value: string) {
    this._roomName = value;
  }

  public get toEMail(): string {
    return this._toEMail;
  }
  @Input()
  public set toEMail(value: string) {
    this._toEMail = value;
  }

  public get lastMessageFrom(): string {
    return this._lastMessageFrom;
  }
  public set lastMessageFrom(value: string) {
    this._lastMessageFrom = value;
  }

  public get lastMessageDate(): string {
    return this._lastMessageDate;
  }
  public set lastMessageDate(value: string) {
    this._lastMessageDate = value;
  }

  public get lastMessageText(): string {
    return this._lastMessageText;
  }
  public set lastMessageText(value: string) {
    this._lastMessageText = value;
  }

  public get isOnline(): boolean {
    return this._isOnline;
  }
  public set isOnline(value: boolean) {
    this._isOnline = value;
  }

  //#endregion

}
