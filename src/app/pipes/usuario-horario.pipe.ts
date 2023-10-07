import { Pipe, PipeTransform } from '@angular/core';
import {DbService, Usuarios} from "../database/db.service";
import {from, map, Observable} from "rxjs";

@Pipe({
  name: 'usuarioHorario'
})
export class UsuarioHorarioPipe implements PipeTransform {

  constructor(
    private readonly dbService: DbService,
  ) {
  }

  transform(value: number | undefined, ...args: unknown[]): Observable<string> {
    if (value === undefined) {
      return new Observable<string>((observer) => {
        observer.next('');
      });
    }
    return from(this.dbService.Horarios.where({
      IdUsuario: value,
    }).toArray()).pipe(map((horarios) => {
      return horarios.map((horario) => horario.Dia).join(', ');
    }));
  }

}
