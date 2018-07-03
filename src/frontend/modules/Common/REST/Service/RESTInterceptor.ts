import {Injectable, Optional} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {RESTConfig} from "../Config/RESTConfig";
import {ResponseFailure} from "../../../Application/Http/ResponseFailure";
import {TokenService} from "../../../Auth/Service/TokenService";
import {AuthModalsService} from "../../../Auth/Service/AuthModalsService";
import {AuthService} from "../../../Auth/Service/AuthService";

@Injectable()
export class RESTInterceptor implements HttpInterceptor
{
    private path: string = "";
    private tokenKey: string = "token";

    constructor(
        @Optional() config: RESTConfig, 
        private tokenService: TokenService, 
        private authModalsService: AuthModalsService,
        private authService: AuthService
    ) {
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

        return next.handle(req)
            .catch((httpErrorResponse: HttpErrorResponse) => {
                let error: ResponseFailure = httpErrorResponse.error;
                switch (error.code) {
                    case 401:
                        if(this.tokenService.isTokenExist()) {
                            return this.authService
                                .refreshToken({"refresh_token": this.tokenService.getRefreshToken()})
                                .flatMap(() => {
                                    req = req.clone({
                                        headers: req.headers.set('Authorization', 'Bearer ' + this.tokenService.getToken())
                                    });
                                    
                                    return next.handle(req);
                                });
                        } else {
                            this.authService.onAuthFailure.emit(error);
                            return Observable.throw(error);
                        }
                    default: return Observable.throw(error);
                }
            }
        );
    }
}