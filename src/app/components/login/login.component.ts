import { Component } from '@angular/core';
import {faCheck, faCoffee, faWarning} from '@fortawesome/free-solid-svg-icons';
import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";
import {NgxIndexedDBService} from "ngx-indexed-db";
import Swal from "sweetalert2";
import {User} from "../../config/db.config";
import {Router} from "@angular/router";

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
    private readonly dbService: NgxIndexedDBService,
    private readonly router: Router,
  ) { }

  startLogin($event: MouseEvent) {
    this.dbService.getByIndex<User>('users', 'username', this.username).subscribe((user) => {
      if (!user) {
        void Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `El usuario <code>${this.username}</code> no existe.`,
        });
        return;
      }

      if (user.password !== this.password) {
        void Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contraseña incorrecta.',
        });
        return;
      }

      sessionStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/home']).catch(console.error)
    });
  }

  protected readonly faCheck = faCheck;
  protected readonly faWarning = faWarning;
  protected readonly alert = alert;
}
