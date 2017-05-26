import {EventEmitter, Injectable, NgZone} from '@angular/core';

import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthRESTService} from "./AuthRESTService";
import {SignInRequest} from "../Http/Request/SignInRequest";
import {Observable, Observer, Scheduler, Subscription} from "rxjs";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {SignUpRequest} from "../Http/Request/SignUpRequest";
import {Token} from "../Entity/Token";
import {Roles} from "../Entity/Role";
import {TokenResponse} from "../Http/Response/TokenResponse";
import {TokenRepository} from "../Repository/TokenRepository";
import {RefreshTokenRequest} from "../Http/Request/RefreshTokenRequest";

const jwtHelper: JwtHelper = new JwtHelper();

export interface AuthServiceInterface {
    isSignedIn(): boolean;
    getRoles(): Roles;
    signIn(body: SignInRequest): Observable<TokenResponse | ResponseFailure>;
    signUp(body: SignUpRequest): Observable<TokenResponse | ResponseFailure>;
    connectVK(): Observable<TokenResponse | ResponseFailure>
    connectFacebook(): Observable<TokenResponse | ResponseFailure>
    signOut(): void;
}

/** 
 * @TODO: replace subscribe handleTokenResponse on TokenResponseListner
 */
@Injectable()
export class AuthService implements AuthServiceInterface 
{
    public onRefreshToken: EventEmitter<any> = new EventEmitter();
    
    private tokenExpirationSchedule: Subscription;

    constructor(
        private router: Router,
        private route: ActivatedRoute, 
        private rest: AuthRESTService, 
        private zone: NgZone
    ) {}

    public isSignedIn(): boolean 
    {
        return tokenNotExpired();
    }

    public getRoles(): Roles 
    {
        let tokenData: Token = jwtHelper.decodeToken(TokenRepository.getToken());
        return tokenData.roles;
    }

    public signIn(body: SignInRequest): Observable<TokenResponse | ResponseFailure> 
    {
        let observableTokenResponse = this.handleTokenResponse(this.rest.signIn(body)).share();
        observableTokenResponse.subscribe(
            ()=> this.router.navigate([this.route.data['returnUrl'] || "/"])
        );
        return observableTokenResponse;
    }

    public signUp(body: SignUpRequest): Observable<TokenResponse | ResponseFailure> 
    {
        let observableTokenResponse = this.handleTokenResponse(this.rest.signUp(body)).share();
        observableTokenResponse.subscribe(
            ()=> this.router.navigate(["/"])
        );
        return observableTokenResponse;
    }

    public refreshToken(body: RefreshTokenRequest): Observable<TokenResponse | ResponseFailure> 
    {
        let observableTokenResponse = this.handleTokenResponse(this.rest.refreshToken(body)).share();
        observableTokenResponse.subscribe(
            (next)  => this.onRefreshToken.emit(next),
            (error) => this.onRefreshToken.error(error),
            ()      => this.onRefreshToken.complete()
        );
        return observableTokenResponse;
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
        TokenRepository.removeTokens();
        this.tokenExpirationSchedule.unsubscribe();
        this.router.navigate(["login"]);
    }

    public addTokenExpirationSchedule()/*: Observable<TokenResponse | ResponseFailure>*/
    {
        if(TokenRepository.isTokenExist()) {
            
            
            let offset: number = 1000;  // Make it 5 sec before token expired
            let delay = TokenRepository.getTokenExpTime() - offset;
            if(this.tokenExpirationSchedule) {
                this.tokenExpirationSchedule.unsubscribe(); // remove all previous schedulers
            }

            this.tokenExpirationSchedule = Scheduler.queue.schedule(() => {
                this.refreshToken({"refresh_token": TokenRepository.getRefreshToken()});
            }, delay);
        }
    }

    private connectSocial(url: string): Observable<TokenResponse | ResponseFailure>
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
                TokenRepository.saveToken(tokenResponse.token);
                TokenRepository.saveRefreshToken(tokenResponse.refresh_token);
                this.addTokenExpirationSchedule();
            },
            (tokenResponseFailure: ResponseFailure) => {
                console.log(tokenResponseFailure.message);
            }
        );

        return observableTokenResponse;
    }
}