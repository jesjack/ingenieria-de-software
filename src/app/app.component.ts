import {Component, OnInit} from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import {LoginListenerService} from "./services/login-listener.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ing-sistemas-yaelis';
  isLogedIn = false;

  constructor(
    private readonly dbService: NgxIndexedDBService,
    private readonly loginService: LoginListenerService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.populateInitialData();
    this.loginService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLogedIn = isLoggedIn;
    });
  }

  populateInitialData(): void {
    const initialRecords = [{
      'firstname': 'Nancy',
      'lastname': 'Castañeda Aparicio',
      'role': 'propietario',
      'age': 20,
      'phone': 1234567890,
      'address': 'Calle 1 # 2-3',
      'username': 'nancy',
      'password': '123456'
    }];

    // first check if nancy username exists
    this.dbService.getByIndex('users', 'username', initialRecords[0].username).subscribe((user) => {
      if (user) {
        return;
      }

      this.dbService.add('users', initialRecords[0]).subscribe(() => {
        console.log('Initial data inserted.');
      });
    });
  }
}
