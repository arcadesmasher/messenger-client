import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  newMsgSound: HTMLAudioElement;

  constructor(){
    this.newMsgSound = new Audio();
    this.newMsgSound.src = "../../../assets/snd/new_msg.mp3"
    this.newMsgSound.load();
  }

}
