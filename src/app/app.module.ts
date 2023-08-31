import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserNameErrorMessagePipe } from './pipes/user-name-error-message.pipe';
import {NgxIndexedDBModule} from "ngx-indexed-db";

import { dbConfig } from './config/db.config';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { NgVarDirective } from './directives/ng-var.directive';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    UserNameErrorMessagePipe,
    NgVarDirective,
    HomeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
