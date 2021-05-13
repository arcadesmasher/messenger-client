import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { TopSideComponent } from './main/top-side/top-side.component';
import { LeftSideComponent } from './main/left-side/left-side.component';
import { RightSideComponent } from './main/right-side/right-side.component';
import { BottomSideComponent } from './main/bottom-side/bottom-side.component';
import { ChatComponent } from './main/right-side/chat/chat.component';
import { RecipientbuttonComponent } from './main/left-side/recipientbutton/recipientbutton.component';
import { AddrecipientComponent } from './main/left-side/addrecipient/addrecipient.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    RegisterComponent,
    MainComponent,
    TopSideComponent,
    LeftSideComponent,
    RightSideComponent,
    BottomSideComponent,
    ChatComponent,
    RecipientbuttonComponent,
    AddrecipientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
