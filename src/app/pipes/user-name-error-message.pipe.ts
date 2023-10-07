import { Pipe, PipeTransform } from '@angular/core';
import {from, map, Observable} from "rxjs";
import { DbService } from '../database/db.service';

@Pipe({
  name: 'userNameErrorMessage'
})
export class UserNameErrorMessagePipe implements PipeTransform {

  constructor(private dbService: DbService) {
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

    return from(this.dbService.Usuarios.where({
      Usuario: value,
    }).toArray()).pipe(map((users): string[] => {
      if (users.length === 0) {
        return [`El usuario <code>${value}</code> no existe.`];
      } else {
        return [];
      }
    }));
  }

}
