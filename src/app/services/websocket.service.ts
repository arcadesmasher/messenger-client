import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

import { IWSMessage } from "../interfaces/wsmessage.interface";
import { DataService } from "./data.service";
import { Constants } from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  messagesSubject: Subject<any>;
  errorsSubject: Subject<any>;

  webSocketSubject: WebSocketSubject<any>;

  constructor(private dataService: DataService){
    this.messagesSubject = new Subject<any>();
    this.errorsSubject = new Subject<any>();
    //
    this.webSocketSubject = webSocket(Constants.domainWS + "/" + this.dataService.loggedInEMail);
    this.subscribeToWS();
  }

  private subscribeToWS(){
    this.webSocketSubject.subscribe(
      msg => this.messagesSubject.next(msg),
      err => this.messagesSubject.next(err),
      () => console.log('complete')
    );
  }

  sendWSMessage(wsMessage: IWSMessage){
    this.webSocketSubject.next(wsMessage);
  }

}
