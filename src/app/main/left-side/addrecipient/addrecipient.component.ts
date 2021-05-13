import { Component, OnInit } from '@angular/core';
import { IRoomInitMessage } from 'src/app/interfaces/roominitmessage.interface';
import { IWSMessage } from 'src/app/interfaces/wsmessage.interface';
import { DataService } from 'src/app/services/data.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Constants } from 'src/app/shared/constants';
import { Now } from 'src/app/shared/now';

@Component({
  selector: 'addrecipient',
  templateUrl: './addrecipient.component.html',
  styleUrls: ['./addrecipient.component.scss']
})
export class AddrecipientComponent implements OnInit {

  private _recipient: string = "";

  isAddRecipientVisible: boolean = false;

  constructor(private dataService: DataService, private websocketService: WebsocketService) { }

  ngOnInit(): void {}

  changeAddRecipientVisible(){
    this.isAddRecipientVisible = !this.isAddRecipientVisible;
  }

  async addRecipient(){
    let eMailExistsResult = await this.dataService.getEMailExists(this.recipient);
    if(!eMailExistsResult.exists){
      alert("E-mail doesn't exist on system: " + this.recipient);
      return;
    }
    for(const room of this.dataService.rooms){
      if(room.toEMail === this.recipient){
        alert("You already have a conversation with that recipient.");
        return;
      }
    }
    let roomInitMsg: IRoomInitMessage = { fromEMail: this.dataService.loggedInEMail, toEMail: this.recipient };
    let wsMsg: IWSMessage = { wsMessageType: Constants.typeRoomInit, wsMessageBody: roomInitMsg, wsMessageDate: Now.getNow() };
    this.websocketService.sendWSMessage(wsMsg);
  }

  //#region Get - Set

  public get recipient(): string {
    return this._recipient;
  }
  public set recipient(value: string) {
    this._recipient = value;
  }

  //#endregion

}
