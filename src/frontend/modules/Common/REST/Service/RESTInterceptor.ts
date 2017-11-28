import {Injectable, Optional} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {RESTConfig} from "../Config/RESTConfig";
import {ResponseFailure} from "../../../Application/Http/ResponseFailure";

@Injectable()
export class RESTInterceptor implements HttpInterceptor
{
    private path: string = "";
    private tokenKey: string = "token";

    constructor(@Optional() config: RESTConfig) {
        this.path = config.path || "";
        this.tokenKey = config.tokenKey || this.tokenKey;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({url: this.path + req.url});

        if (typeof localStorage != 'undefined' && req.withCredentials && localStorage.getItem(this.tokenKey)) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem(this.tokenKey))
            });
        }

        return next.handle(req).catch((error: HttpErrorResponse) => Observable.throw(<ResponseFailure>error.error));
    }
}