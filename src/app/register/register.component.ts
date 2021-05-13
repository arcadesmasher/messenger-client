import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as cryptojs from 'crypto-js';
import { DataService } from '../services/data.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private _email = "";
  private _password = "";

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {}

  async register(){
    let eMail = this.email;
    let eMailExistsResult = await this.dataService.getEMailExists(eMail);
    if(eMailExistsResult.exists){
      alert("E-mail exists on system: " + eMail);
      return;
    }
    let encryptedPass = cryptojs.SHA256(this.password).toString(cryptojs.enc.Base64);
    let registerResult = await this.dataService.register(eMail, encryptedPass);
    if(registerResult.registerDone){
      alert("Registration done. Please continue with the login screen.");
      this.router.navigate(["/login"]);
    } else {
      alert("Registration incomplete. Check the error logs. (console)");
    }
  }

  //#region Get - Set

  public get email() {
    return this._email;
  }
  public set email(value) {
    this._email = value;
  }

  public get password() {
    return this._password;
  }
  public set password(value) {
    this._password = value;
  }

  //#endregion

}
