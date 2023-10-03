import { Component } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {LoginListenerService} from "../../services/login-listener.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private destroyed$: Subject<void> = new Subject<void>();
  constructor(
    private readonly loginService: LoginListenerService,
    private readonly router: Router,
  ) {
    this.loginService.isLoggedIn()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/home']).catch(console.error);
        }

        this.destroyed$.next();
        this.destroyed$.complete();
      });
  }
}
