import {Injectable, Injector, Optional} from '@angular/core';
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
    private readonly path: string = "";
    private readonly tokenPrefix: string = "Bearer ";
    private retry: number = 0;

    constructor(
        @Optional() config: RESTConfig, 
        private tokenService: TokenService,
        private authModalsService: AuthModalsService,
        private injector: Injector
    ) {
        this.path = config.path || "";
        this.tokenPrefix = config.tokenPrefix || this.tokenPrefix;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({url: this.path + req.url});

        if (req.withCredentials && this.tokenService.isTokenExist()) {
            req = this.authorizeRequest(req);
        }

        return next.handle(req)
            .catch((httpErrorResponse: HttpErrorResponse) => {
                let error: ResponseFailure = httpErrorResponse.error;
                switch (error.code) {
                    case 401:
                        let authService = this.injector.get(AuthService);
                        if(this.tokenService.isTokenExist() && ++this.retry < 3) { // recursion refresh token can by 401!
                            return authService
                                .refreshToken({"refresh_token": this.tokenService.getRefreshToken()})
                                .do(() => this.retry = 0)
                                .flatMap(() => next.handle(this.authorizeRequest(req)));
                        } else {
                            this.retry = 0;
                            authService.onAuthFailure.emit(error);
                            return Observable.throw(error);
                        }
                    default: return Observable.throw(error);
                }
            }
        );
    }
    
    private authorizeRequest(req: HttpRequest<any>) : HttpRequest<any>
    {
        return req.clone({
            headers: req.headers.set('Authorization', this.tokenPrefix + this.tokenService.getToken())
        })
    }
}