import { Pipe, PipeTransform } from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import {map, Observable} from "rxjs";
import {User} from "../config/db.config";

@Pipe({
  name: 'userNameErrorMessage'
})
export class UserNameErrorMessagePipe implements PipeTransform {

  constructor(private dbService: NgxIndexedDBService) {
  }

  transform(value: string, ...args: unknown[]) {
    if (value.length === 0) {
      return new Observable<string[]>((observer) => {
        observer.next([]);
      });
    } else if (value.length < 3) {
      return new Observable<string[]>((observer) => {
        observer.next([
          'El usuario debe tener al menos 3 caracteres.',
          `El usuario <code>${value}</code> no existe.`]);
      });
    }

    return this.dbService.getByIndex('users', 'username', value).pipe(map((user): string[] => {
      if (!user) {
        return [`El usuario <code>${value}</code> no existe.`];
      } else {
        return [];
      }
    }));
  }

}
