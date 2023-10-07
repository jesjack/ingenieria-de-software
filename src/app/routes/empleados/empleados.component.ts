import { Component } from '@angular/core';
import {DbService, PUESTOS, Usuarios} from "../../database/db.service";
import Swal, {SweetAlertOptions} from "sweetalert2";
import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent {
  empleados: Array<Usuarios> = [];

  constructor(
    private readonly dbService: DbService,
    public readonly swalTargets: SwalPortalTargets,
  ) {
    dbService.Usuarios.toArray().then((users) => this.empleados = users);
  }

  protected readonly PUESTOS = PUESTOS;
  nuevoEmpleadoNombre: string = '';
  nuevoEmpleadoApellidos: string = '';
  nuevoEmpleadoPuesto: string = '';
  nuevoEmpleadoFechaNacimiento: string = new Date().toISOString().split('T')[0];
  nuevoEmpleadoTelefono: string = '';
  nuevoEmpleadoDireccion: string = '';
  nuevoEmpleadoUsername: string = '';
  nuevoEmpleadoPassword: string = '';
}
