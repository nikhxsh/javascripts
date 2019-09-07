import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, //The outgoing request object to handle.
        next: HttpHandler) //The next interceptor in the chain, or the backend if no interceptors remain in the chain.
        : Observable<HttpEvent<any>> {
        // const token: string = localStorage.getItem('token');

        // if (token) {
        //     request = request.clone({
        //         headers: request.headers.set('Authorization', 'Bearer ' + token)
        //     });
        // }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({
        //         headers: request.headers.set('Content-Type', 'application/json')
        //     });
        // }

        // request = request.clone({
        //     headers: request.headers.set('Accept', 'application/json')
        // });
        return next.handle(request);
        // return next.handle(request).pipe(
        //     //This code will handle the API response. we can handle each and every response from the API
        //     map((event: HttpEvent<any>) => { 
        //         if (event instanceof HttpResponse) {
        //             console.log('event--->>>', event);
        //         }
        //         return event;
        //     }),
        //     //The below code will handle the error response
        //     catchError((error: HttpErrorResponse) => {
        //         let data = {};
        //         data = {
        //             reason: error && error.error.reason ? error.error.reason : '',
        //             status: error.status
        //         };
        //         //this.errorDialogService.openDialog(data);
        //         return throwError(error);
        //     }));
    }
}