import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from './authenticate/services/user/user.service';
import { NeonbillService } from './neonbilling/services/neonbill.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService, private neonbillService: NeonbillService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401].includes(err.status) && this.authenticationService.userValue) {
                this.authenticationService.logout();
            }
            if ([403].includes(err.status) && this.neonbillService.Neontokenvalue) {
                this.neonbillService.logout();
            }
            const error = (err && err.error && err.error.message) || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }
}