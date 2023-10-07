import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './routes/main/main.component';
import { LoginComponent } from './routes/login/login.component';
import {HomeComponent} from "./routes/home/home.component";
import {VentasComponent} from "./routes/ventas/ventas.component";
import {InventarioComponent} from "./routes/inventario/inventario.component";
import {EmpleadosComponent} from "./routes/empleados/empleados.component";
import {LogOutComponent} from "./routes/log-out/log-out.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'ventas',
    component: VentasComponent
  },

  {
    path: 'inventario',
    component: InventarioComponent
  },

  {
    path: 'empleados',
    component: EmpleadosComponent
  },

  {
    path: 'logout',
    component: LogOutComponent
  },

  {
    path: '**',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
