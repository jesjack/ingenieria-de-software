import { Component } from '@angular/core';
import {LoginListenerService} from "../../services/login-listener.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {

    constructor(
      private readonly loginService: LoginListenerService,
      private readonly router: Router,
    ) {
      this.loginService.log_out();
      this.router.navigate(['/login']).catch(console.error);
    }
}
