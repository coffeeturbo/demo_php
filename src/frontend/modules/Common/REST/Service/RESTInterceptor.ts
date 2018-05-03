import {Inject, Injectable, Optional} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {RESTConfig} from "../Config/RESTConfig";
import {ResponseFailure} from "../../../Application/Http/ResponseFailure";
import {TokenService} from "../../../Auth/Service/TokenService";
import {REQUEST} from "@nguniversal/express-engine/tokens";
import {Request} from "express";
import {PlatformService} from "../../../Application/Service/PlatformService";

@Injectable()
export class RESTInterceptor implements HttpInterceptor
{
    private path: string = "";
    private tokenKey: string = "token";

    constructor(
        @Optional() config: RESTConfig,
        @Optional() @Inject(REQUEST) private req: Request,
        private tokenService: TokenService,
        private pl: PlatformService
    ) {
        if(pl.isPlatformServer() && config.path) {
            config.path = req.protocol + "://" + config.path;
        }
        
        this.path = config.path || "";
        this.tokenKey = config.tokenKey || this.tokenKey;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({url: this.path + req.url});

        if (req.withCredentials && this.tokenService.isTokenExist()) {
            req = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken())
            });
        }

        return next.handle(req).catch((error: HttpErrorResponse) => Observable.throw(<ResponseFailure>error.error));
    }
}