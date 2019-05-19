import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loggedOut: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuthenticated().then((authenticated) => {
      this.loggedOut = !authenticated;
    })
  }

  needsLogin() {
    return !this.authService.xisAuthenticated();
  }
}
