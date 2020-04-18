import { Component, OnInit, inject, Injector } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loggedOut: boolean = true;

  constructor(
    private authService: AuthService
    //@Inject() is a manual mechanism for letting Angular know that a parameter must be injected.
    //@inject(AuthService) private authService: AuthService
  ) { }

  ngOnInit() {
    this.loggedOut = this.authService.isAuthenticated();
  }

  needsLogin() {
    return !this.authService.isAuthenticated();
  }
}
