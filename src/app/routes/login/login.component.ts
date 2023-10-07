import { Component } from '@angular/core';
import {faCheck, faCoffee, faWarning} from '@fortawesome/free-solid-svg-icons';
import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";
import {NgxIndexedDBService} from "ngx-indexed-db";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {LoginListenerService} from "../../services/login-listener.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: any;

  constructor(
    public readonly swalTargets: SwalPortalTargets,
    private readonly loginService: LoginListenerService,
    private readonly router: Router,
  ) { }

  startLogin($event: MouseEvent) {
    this.loginService.log_in(this.username, this.password, (wrongPassword) => {
      if (wrongPassword) {
        void Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contraseña incorrecta.',
        });
        return;
      }

      this.router.navigate(['/home']).catch(console.error)
    });
  }

  protected readonly faCheck = faCheck;
  protected readonly faWarning = faWarning;
  protected readonly alert = alert;
}
