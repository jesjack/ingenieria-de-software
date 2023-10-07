import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './routes/main/main.component';
import { LoginComponent } from './routes/login/login.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserNameErrorMessagePipe } from './pipes/user-name-error-message.pipe';

import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgVarDirective } from './directives/ng-var.directive';
import { HomeComponent } from './routes/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { VentasComponent } from './routes/ventas/ventas.component';
import { InventarioComponent } from './routes/inventario/inventario.component';
import { EmpleadosComponent } from './routes/empleados/empleados.component';
import { LogOutComponent } from './routes/log-out/log-out.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { UsuarioHorarioPipe } from './pipes/usuario-horario.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    UserNameErrorMessagePipe,
    NgVarDirective,
    HomeComponent,
    NavbarComponent,
    NavItemComponent,
    VentasComponent,
    InventarioComponent,
    EmpleadosComponent,
    LogOutComponent,
    TruncatePipe,
    UsuarioHorarioPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    SweetAlert2Module.forRoot({
      provideSwal: () => import('sweetalert2').then(({default: swal}) => swal.mixin({
        heightAuto: false,
      }))
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
