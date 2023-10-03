import { Component } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {LoginListenerService} from "../../services/login-listener.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private destroyed$: Subject<void> = new Subject<void>();
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginListenerService,
  ) {
    this.loginService.isLoggedIn()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/']).catch(console.error);
        }

        this.destroyed$.next();
        this.destroyed$.complete();
      });
  }
}
