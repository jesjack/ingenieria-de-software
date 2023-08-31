import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {User} from "../config/db.config";

@Injectable({
  providedIn: 'root'
})
export class LoginListenerService {

  constructor(
    private readonly dbService: NgxIndexedDBService,
  ) {
    this.loggedInSubject.next(!!sessionStorage.getItem('user'));
  }

  private loggedInSubject = new BehaviorSubject<boolean>(false);

  log_in(username: string, password: string, callback: (wrongPassword: boolean) => void) {

    this.dbService.getByIndex<User>('users', 'username', username).subscribe((user) => {
      if (!user || user.password !== password) {
        callback(true);
        return;
      }

      sessionStorage.setItem('user', JSON.stringify(user));
      this.loggedInSubject.next(true);
      callback(false);
    });
  }

  log_out() {

    this.loggedInSubject.next(false);
  }

  isLoggedIn() {
    return this.loggedInSubject.asObservable();
  }
}
