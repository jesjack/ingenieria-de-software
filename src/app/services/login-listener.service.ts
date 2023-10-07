import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DbService} from "../database/db.service";

@Injectable({
  providedIn: 'root'
})
export class LoginListenerService {

  constructor(
    private readonly dbService: DbService,
  ) {
    this.loggedInSubject.next(!!sessionStorage.getItem('user'));
  }

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  log_in(username: string, password: string, callback: (wrongPassword: boolean) => void) {

    this.dbService.Usuarios.where({
      Usuario: username,
      Contrasena: password
    }).toArray().then((users) => {
      if (users.length === 0) {
        callback(true);
        return;
      }

      sessionStorage.setItem('user', JSON.stringify(users[0]));
      this.loggedInSubject.next(true);
      callback(false);
    })

  }

  log_out() {
    sessionStorage.removeItem('user');
    this.loggedInSubject.next(false);
  }

  isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }
}
