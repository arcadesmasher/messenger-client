import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private _email = "";
  private _password = "";

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  async login(){
    let eMail = this.email;
    let password = this.password;
    let eMailExistsResult = await this.dataService.getEMailExists(eMail);
    if(!eMailExistsResult.exists){
      alert("E-mail doesn't exist on system: " + eMail);
      return;
    }
    let checkUserInfoTrueResult = await this.dataService.checkLoginInfoTrue(eMail, password);
    if(!checkUserInfoTrueResult.isTrue){
      alert("Incorrect password.");
      return;
    }
    let isUserOnlineResult = await this.dataService.checkIsUserOnline(eMail);
    if(isUserOnlineResult.isOnline){
      alert("This user is already online.");
      return;
    }
    alert("Login successful.");
    this.dataService.loggedInEMail = eMail;
    this.router.navigate(["/main"]);
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
