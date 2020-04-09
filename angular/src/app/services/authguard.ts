import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Angular’s route guards are interfaces which can tell the router whether or not it should allow navigation to 
 * a requested route. 
 * They make this decision by looking for a true or false return value from a class which implements the given 
 * guard interface.
 * There are five different types of guards and each of them is called in a particular sequence. 
 * The router’s behavior is modified differently depending on which guard is used. The guards are:
 *      CanActivate
 *      CanActivateChild
 *      CanDeactivate
 *      CanLoad
 *      Resolve
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}