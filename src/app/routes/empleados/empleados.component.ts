import { Component } from '@angular/core';
import {DbService, PUESTOS, Usuarios} from "../../database/db.service";
import S, {SweetAlertOptions} from "sweetalert2";
import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";
import {faCalendar, faTrash} from "@fortawesome/free-solid-svg-icons";
import {LoginListenerService} from "../../services/login-listener.service";
import { Router } from '@angular/router';

const Swal = S.mixin({
  heightAuto: false,
});

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
    public readonly loginListenerService: LoginListenerService,
    private readonly router: Router,
  ) {

    this.loginListenerService.isLoggedIn().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        this.router.navigate(['/']).catch(console.error);
      } else if (JSON.parse(sessionStorage.getItem('user') || '{}').Puesto !== 'Administrador' && JSON.parse(sessionStorage.getItem('user') || '{}').Puesto !== 'Dueña') {
        this.router.navigate(['/']).catch(console.error);
      }
    });

    dbService.Usuarios.toArray().then((users) => this.empleados = users);
  }

  protected readonly PUESTOS = PUESTOS;
  nuevoEmpleadoNombre: string = '';
  nuevoEmpleadoApellidos: string = '';
  nuevoEmpleadoPuesto: 'Dueña' | 'Empleado' | 'Administrador' = 'Empleado';
  nuevoEmpleadoFechaNacimiento: Date = new Date();
  nuevoEmpleadoTelefono: string = '';
  nuevoEmpleadoDireccion: string = '';
  nuevoEmpleadoUsername: string = '';
  nuevoEmpleadoPassword: string = '';

  nuevoEmpleadoConfirm($event: any) {
    if (!$event) return;

    const nuevoEmpleado: Usuarios = {
      Nombre: this.nuevoEmpleadoNombre,
      Apellidos: this.nuevoEmpleadoApellidos,
      Puesto: this.nuevoEmpleadoPuesto,
      FechaNacimiento: this.nuevoEmpleadoFechaNacimiento,
      Telefono: this.nuevoEmpleadoTelefono,
      Direccion: this.nuevoEmpleadoDireccion,
      Usuario: this.nuevoEmpleadoUsername,
      Contrasena: this.nuevoEmpleadoPassword,
    };

    if (nuevoEmpleado.Nombre.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'El nombre no puede estar vacío',
        icon: 'error',
      });
      return;
    }

    if (nuevoEmpleado.Apellidos.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'Los apellidos no pueden estar vacíos',
        icon: 'error',
      });
      return;
    }

    if (nuevoEmpleado.Telefono.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'El teléfono no puede estar vacío',
        icon: 'error',
      });
      return;
    }

    if (nuevoEmpleado.Direccion.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'La dirección no puede estar vacía',
        icon: 'error',
      });
      return;
    }

    if (nuevoEmpleado.Usuario.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'El usuario no puede estar vacío',
        icon: 'error',
      });
      return;
    }

    if (nuevoEmpleado.Contrasena.trim() === '') {
      Swal.fire({
        title: 'Error',
        text: 'La contraseña no puede estar vacía',
        icon: 'error',
      });
      return;
    }

    if (nuevoEmpleado.Contrasena.length < 8) {
      Swal.fire({
        title: 'Error',
        text: 'La contraseña debe tener al menos 8 caracteres',
        icon: 'error',
      });
      return;
    }

    this.dbService.Usuarios.add(nuevoEmpleado).then(() => {
      this.empleados.push(nuevoEmpleado);
      this.nuevoEmpleadoNombre = '';
      this.nuevoEmpleadoApellidos = '';
      this.nuevoEmpleadoPuesto = 'Empleado';
      this.nuevoEmpleadoFechaNacimiento = new Date();
      this.nuevoEmpleadoTelefono = '';
      this.nuevoEmpleadoDireccion = '';
      this.nuevoEmpleadoUsername = '';
      this.nuevoEmpleadoPassword = '';
    });

    console.log(nuevoEmpleado);
  }

  protected readonly faTrash = faTrash;

  deleteEmpleado(IdUsuario: number | undefined) {
    if (!IdUsuario) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dbService.Usuarios.delete(IdUsuario).then(() => {
          this.empleados = this.empleados.filter((empleado) => empleado.IdUsuario !== IdUsuario);
        });
      }
    });
  }

  protected readonly faCalendar = faCalendar;
  configHorariosHorario: any;
  horarios: any;

  configHorariosConfirm($event: any) {
    
  }
}

function stringToDate(dateString: string): Date {
  console.log(dateString);
  const [year, month, day] = dateString.split('-');
  return new Date(+year, +month - 1, +day);
}
