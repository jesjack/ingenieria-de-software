import {Component, OnInit} from '@angular/core';
import {DbService, Inventario, PUESTOS} from "../../database/db.service";
import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";
import S from "sweetalert2";

const Swal = S.mixin({
  heightAuto: false,
});

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

    protected readonly PUESTOS = PUESTOS;
  nuevoProductoNombre: string = '';
  nuevoProductoPrecio: number = 0;
  nuevoProductoDescripcion: any = '';
  nuevoProductoCantidad: number = 0;
  nuevoProductoPrecioProveedor: number = 0;

  productos: Array<Inventario> = [];

    constructor(
      public readonly swalTargets: SwalPortalTargets,
      private readonly dbService: DbService,
    ) {
    }

    ngOnInit(): void {
      this.dbService.Inventario.toArray().then((productos) => this.productos = productos);
    }

  nuevoProductoConfirm($event: any) {
      // validations
      if (!$event) return;
      if (this.nuevoProductoNombre.length < 1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El nombre del producto no puede estar vacío',
        });
        return;
      }
      if (this.nuevoProductoPrecio < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El precio no puede ser menor a 0',
        });
        return;
      }
      if (this.nuevoProductoCantidad < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La cantidad no puede ser menor a 0',
        });
        return;
      }
      if (this.nuevoProductoPrecioProveedor < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El precio del proveedor no puede ser menor a 0',
        });
        return;
      }
      if (this.nuevoProductoDescripcion.length < 1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La descripción no puede estar vacía',
        });
        return;
      }
      // end validations

      const nuevoProducto: Inventario = {
        NombreProducto: this.nuevoProductoNombre,
        Precio: this.nuevoProductoPrecio,
        Descripcion: this.nuevoProductoDescripcion,
        Cantidad: this.nuevoProductoCantidad,
        PrecioProveedor: this.nuevoProductoPrecioProveedor,
      };

      this.dbService.Inventario.add(nuevoProducto).then(() => {
        Swal.fire({
          title: 'Éxito',
          text: 'El producto se ha agregado correctamente',
          icon: 'success',
        });
        this.nuevoProductoNombre = '';
        this.nuevoProductoPrecio = 0;
        this.nuevoProductoDescripcion = '';
        this.nuevoProductoCantidad = 0;
        this.nuevoProductoPrecioProveedor = 0;
        this.dbService.Inventario.toArray().then((productos) => this.productos = productos);
      }).catch((err) => {
        Swal.fire({
          title: 'Error',
          text: 'El producto no se ha podido agregar',
          icon: 'error',
        });
        console.error(err);
      });
  }

  contextTupleProducto($event: MouseEvent, producto: Inventario) {
    if (!producto) return;
    $event.preventDefault();
    Swal.fire({
      title: 'Producto',
      html: `
        <table class="tabla-demostrativa">
          <tr>
            <th>Nombre</th><td>${producto.NombreProducto}</td>
          </tr>
          <tr>
            <th>Precio</th><td>${producto.Precio}</td>
          </tr>
          <tr>
            <th>Descripción</th><td>${producto.Descripcion}</td>
          </tr>
          <tr>
            <th>Cantidad</th><td>${producto.Cantidad}</td>
          </tr>
          <tr>
            <th>Precio Proveedor</th><td>${producto.PrecioProveedor}</td>
          </tr>
        </table>
      `,
      showConfirmButton: false,
    });
  }
}
