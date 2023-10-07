import { Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent {
  ventas: Venta[];

  constructor() {
    this.ventas = [
      {
        producto: 'Blusa licra',
        precio: 100,
        cantidad: 1,
      },
      {
        producto: 'Blusa algodón',
        precio: 200,
        cantidad: 3,
      },
      {
        producto: 'Blusa seda',
        precio: 300,
        cantidad: 2,
      },
      {
        producto: 'Pantalón mezclilla',
        precio: 400,
        cantidad: 1,
      }
    ];
  }
}

interface Venta {
  producto: string;
  precio: number;
  cantidad: number;
}
