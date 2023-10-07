import {Component, OnInit} from '@angular/core';
import {LoginListenerService} from "./services/login-listener.service";
import {Router} from "@angular/router";
import {DbService} from "./database/db.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ing-sistemas-yaelis';
  isLogedIn = false;

  constructor(
    private readonly loginService: LoginListenerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLogedIn = isLoggedIn;
    });
  }
}
