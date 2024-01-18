import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BusySchedules';
  isLogged = false;
  constructor(private auth : AuthService, private router : Router ){}

  logout()
  {
    this.auth.logout();
  }

  isLoggedIn():boolean
  {
    return this.auth.isLoggedIn();
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }
  
}
