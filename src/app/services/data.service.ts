import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Subject } from "rxjs";

import { Room } from "../models/room.model";
import { Constants } from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  loggedInEMail: string = "";
  rooms: Room[] = [];

  lastChosenRoomSubject: Subject<Room>;

  constructor(private http: HttpClient){
    this.lastChosenRoomSubject = new Subject<Room>();
  }

  //#region HTTP req.

  //#region Data Controls

  getEMailExists(eMail: string): Promise<any> {
    return this.http.post<any>(Constants.domainHTTP + "/getEMailExists", { "eMail": eMail }).toPromise();
  }

  //#endregion

  //#region Login

  checkLoginInfoTrue(eMail: string, password: string): Promise<any> {
    return this.http.post<any>(Constants.domainHTTP + "/checkLoginInfoTrue", { "eMail": eMail, "password": password }).toPromise();
  }

  //#endregion

  //#region Registration

  register(eMail: string, encPass: string): Promise<any> {
    return this.http.post<any>(Constants.domainHTTP + "/register", { "eMail": eMail, "encPass": encPass }).toPromise();
  }

  //#endregion

  //#region Online/Offline Status

  checkIsUserOnline(eMail: string): Promise<any> {
    return this.http.post<any>(Constants.domainHTTP + "/checkIsUserOnline", { "eMail": eMail }).toPromise();
  }

  //#endregion

  //#region Messages

  getPreviousMessages(room: string): Promise<any> {
    return this.http.post<any>(Constants.domainHTTP + "/getPreviousMessages", { "room": room }).toPromise();
  }

  getLastMessage(room: string): Promise<any> {
    return this.http.post<any>(Constants.domainHTTP + "/getLastMessage", { "room": room }).toPromise();
  }

  //#endregion

  //#endregion

}
