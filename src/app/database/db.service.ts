import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  Inventario: Dexie.Table<Inventario, number>;
  Ventas: Dexie.Table<Ventas, number>;
  Usuarios: Dexie.Table<Usuarios, number>;
  Contabilidad: Dexie.Table<Contabilidad, number>;
  Horarios: Dexie.Table<Horarios, number>;

  constructor() {
    super('MyDatabase');

    // Define las tablas y sus esquemas
    this.version(1).stores({
      Inventario: '++IdProducto, NombreProducto, Precio, Descripcion, Cantidad, PrecioProveedor',
      Ventas: '++IdVenta, IdProducto, Cantidad, FechaHora, IdUsuario',
      Usuarios: '++IdUsuario, Nombre, Apellidos, Puesto, FechaNacimiento, Telefono, Direccion, Usuario, Contrasena',
      Contabilidad: '++IdContabilidad, FechaHoraApertura, FechaHoraCierre, ConteoMonetario, IdUsuario',
      Horarios: '++IdHorario, IdUsuario, Dia, Entrada, Salida',
    });

    // Definir relaciones
    this.Inventario = this.table('Inventario');
    this.Ventas = this.table('Ventas');
    this.Usuarios = this.table('Usuarios');
    this.Contabilidad = this.table('Contabilidad');
    this.Horarios = this.table('Horarios');

    this.open()
      .then(() => {
        console.log('Database opened');
        this.createInitialData();
      })
      .catch((err) => console.error(err));
  }

  private createInitialData() {
    this.Usuarios.where({
      Puesto: 'Administrador'
    }).count().then((count) => {
      if (count === 0) {
        const d = '01/01/2000';
        this.Usuarios.add({
          Nombre: 'Admin',
          Apellidos: 'Admin',
          Puesto: 'Administrador',
          FechaNacimiento: new Date(+d.split('/')[2], +d.split('/')[1] - 1, +d.split('/')[0]),
          Telefono: '0000000000',
          Direccion: 'Admin',
          Usuario: 'admin',
          Contrasena: 'admin',
        })
      }
    })
  }
}

// Definir las interfaces para las tablas
export interface Inventario {
  IdProducto?: number;
  NombreProducto: string;
  Precio: number;
  Descripcion: string;
  Cantidad: number;
  PrecioProveedor: number;
}

export interface Ventas {
  IdVenta?: number;
  IdProducto: number;
  Cantidad: number;
  FechaHora: string;
  IdUsuario: number;
}

export const PUESTOS = ['Dueña', 'Empleado', 'Administrador'] as const;

export interface Usuarios {
  IdUsuario?: number;
  Nombre: string;
  Apellidos: string;
  Puesto: 'Dueña' | 'Empleado' | 'Administrador';
  FechaNacimiento: Date;
  Telefono: string;
  Direccion: string;
  Usuario: string;
  Contrasena: string;
}

export interface Contabilidad {
  IdContabilidad?: number;
  FechaHoraApertura: string;
  FechaHoraCierre: string;
  ConteoMonetario: number;
  IdUsuario: number;
}

export interface Horarios {
  IdHorario?: number;
  IdUsuario: number;
  Dia: 'L' | 'Ma' | 'Mi' | 'J' | 'V' | 'S' | 'D';
  Entrada: string;
  Salida: string;
}
