import { Injectable } from '@angular/core';
//import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * - @Injectable is Decorator that marks a class as available to be provided and injected as a 
 *   dependency.
 * - When you provide the service at the root level, Angular creates a single, shared instance 
 *   of AuthService and injects it into any class that asks for it. 
 * - Registering the provider in  the @Injectable() metadata also allows Angular to optimize an 
 *   app by removing the service from the compiled app if it isn't used.
 * - When you add a service provider to the root application injector, it’s available throughout 
 *   the app. Additionally, these providers are also available to all the classes in the app as 
 *   long they have the lookup token.
 * - You should always provide your service in the root injector unless there is a case where you 
 *   want the service to be available only if the consumer imports a particular @NgModule.
 * - There are two ways to make a service a singleton in Angular:
 *   > Declare root for the value of the @Injectable() providedIn property
 *   > Include the service in the AppModule or in a module that is only imported by the AppModule
 * 
 * - You can make a provider tree-shakable by specifying it in the @Injectable() decorator on the 
 *   service itself, rather than in the metadata for the NgModule or component that depends on the 
 *   service.
 */
@Injectable({
  providedIn: 'root'
  //providedIn: UserModule
 })
export class AuthService {

  //public jwtHelper: JwtHelperService
  constructor() { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    //return !this.jwtHelper.isTokenExpired(token);
    return true;
  }
}
