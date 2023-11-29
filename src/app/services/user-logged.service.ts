import { Injectable } from '@angular/core';
import {Usuarios} from "../database/db.service";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  constructor() { }

  getUserLogged(): Usuarios | undefined {
    const user = sessionStorage.getItem('user');
    if (!user) return undefined;
    return JSON.parse(user);
  }
}
