import {Injectable, NgZone} from '@angular/core';

import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthRESTService} from "./AuthRESTService";
import {SignInResponse} from "../Http/Response/SignInResponse";
import {SignInRequest} from "../Http/Request/SignInRequest";
import {Observable, Observer} from "rxjs";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {SignUpRequest} from "../Http/Request/SignUpRequest";
import {SignUpResponse} from "../Http/Response/SignUpResponse";
import {Token} from "../Entity/Token";
import {Roles} from "../Entity/Role";
import {TokenResponse} from "../Http/Response/TokenResponse";

const jwtHelper: JwtHelper = new JwtHelper();

export interface AuthServiceInterface {
    isSignedIn(): boolean;
    getRoles(): Roles;
    signIn(body: SignInRequest): Observable<SignInResponse | ResponseFailure>;
    signUp(body: SignUpRequest): Observable<SignUpResponse | ResponseFailure>;
    connectVK(): Observable<TokenResponse | ResponseFailure>
    connectFacebook(): Observable<TokenResponse | ResponseFailure>
    signOut(): void;
}


@Injectable()
export class AuthService implements AuthServiceInterface {
    constructor(private router: Router, private route: ActivatedRoute, private rest: AuthRESTService, private zone: NgZone) {}

    public isSignedIn(): boolean 
    {
        return tokenNotExpired();
    }

    public getRoles(): Roles 
    {
        let tokenData: Token = jwtHelper.decodeToken(localStorage.getItem("token"));
        return tokenData.roles;
    }

    public signIn(body: SignInRequest): Observable<SignInResponse | ResponseFailure> 
    {
        return this.handleTokenResponse(
            this.rest.signIn(body)
        );
    }

    public signUp(body: SignUpRequest): Observable<SignUpResponse | ResponseFailure> 
    {
        return this.handleTokenResponse(
            this.rest.signUp(body)
        );
    }

    public connectVK(): Observable<TokenResponse | ResponseFailure> 
    {
        return this.connectSocial(`/api/oAuth/connect/vk`);
    }

    public connectFacebook(): Observable<TokenResponse | ResponseFailure> 
    {
        return this.connectSocial(`/api/oAuth/connect/facebook`);
    }

    public signOut(): void 
    {
        localStorage.removeItem('token');
        this.router.navigate(["login"]);
    }

    private connectSocial(url: string)
    {
        let connectWindow: Window = window.open(url, null, "menubar=no,toolbar=no,location=no");

        return this.handleTokenResponse(
            new Observable((observer: Observer<TokenResponse>) => {

                let interval = window.setInterval(() => {
                    if (connectWindow && connectWindow.closed) {
                        window.clearInterval(interval);
                        observer.error({"code": 410, "message": "Authorization aborted"});
                    }
                }, 100);
                connectWindow.opener.onmessage = (event: MessageEvent) => {
                    this.zone.run(() => { // Forse refresh component
                        window.clearInterval(interval);
                        connectWindow.close();
                        observer.next(event.data);
                    })
                }
            })
        );
    }

    private handleTokenResponse(observableTokenResponse: Observable<TokenResponse | ResponseFailure>): Observable<TokenResponse | ResponseFailure> 
    {
        observableTokenResponse = observableTokenResponse.share();

        observableTokenResponse.subscribe(
            (tokenResponse: TokenResponse) => {
                localStorage.setItem('token', tokenResponse.token);
                this.router.navigate([this.route.data['returnUrl'] || "/"]);
            },
            (tokenResponseFailure: ResponseFailure) => {
                console.log(tokenResponseFailure.message);
            }
        );
        return observableTokenResponse;

    }
}