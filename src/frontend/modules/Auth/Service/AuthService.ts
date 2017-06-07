import {EventEmitter, Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Observer, Scheduler, Subscription} from "rxjs";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";

import {AuthRESTService} from "./AuthRESTService";
import {SignInRequest} from "../Http/Request/SignInRequest";
import {SignUpRequest} from "../Http/Request/SignUpRequest";
import {TokenResponse} from "../Http/Response/TokenResponse";
import {RefreshTokenRequest} from "../Http/Request/RefreshTokenRequest";
import {Token} from "../Entity/Token";
import {Roles} from "../Entity/Role";
import {TokenRepository} from "../Repository/TokenRepository";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";

const jwtHelper: JwtHelper = new JwtHelper();

export interface AuthServiceInterface {
    isSignedIn(): boolean;
    getRoles(): Roles;
    signIn(body: SignInRequest): Observable<TokenResponse>;
    signUp(body: SignUpRequest): Observable<TokenResponse>;
    connectVK(): Observable<TokenResponse>
    connectFacebook(): Observable<TokenResponse>
    signOut(): void;
    addTokenExpirationSchedule(): void
}

@Injectable()
export class AuthService implements AuthServiceInterface 
{
    public onAuth = new EventEmitter<TokenResponse>();

    private tokenExpirationSchedule: Subscription = new Subscription();
    private returlUrl: string = "/";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private rest: AuthRESTService
    ) {
        this.onAuth.subscribe(
            (tokenResponse: TokenResponse) => {
                TokenRepository.saveToken(tokenResponse.token);
                TokenRepository.saveRefreshToken(tokenResponse.refresh_token);
                this.addTokenExpirationSchedule();
                this.router.navigateByUrl(this.returlUrl);
            },
            () => this.signOut()
        );
    }

    public isSignedIn(): boolean 
    {
        return tokenNotExpired();
    }

    public getRoles(): Roles 
    {
        let tokenData: Token = jwtHelper.decodeToken(TokenRepository.getToken());
        return tokenData.roles;
    }

    public getProfilePath(): string | number
    {
        let tokenData: Token = jwtHelper.decodeToken(TokenRepository.getToken());
        return tokenData.profile_alias || tokenData.profile_id;
    }

    public signIn(body: SignInRequest): Observable<TokenResponse> 
    {
        this.returlUrl = this.route.data["returnUrl"] || "/";
        return this.handleTokenResponse(this.rest.signIn(body));
    }

    public signUp(body: SignUpRequest): Observable<TokenResponse> 
    {
        this.returlUrl = "/";
        return this.handleTokenResponse(this.rest.signUp(body));
    }

    public refreshToken(body: RefreshTokenRequest): Observable<TokenResponse> 
    {
        return this.handleTokenResponse(this.rest.refreshToken(body));
    }

    public connectVK(): Observable<TokenResponse> 
    {
        return this.connectSocial(`/api/oAuth/connect/vk`);
    }

    public connectFacebook(): Observable<TokenResponse> 
    {
        return this.connectSocial(`/api/oAuth/connect/facebook`);
    }

    public signOut(): void 
    {
        TokenRepository.removeTokens();
        this.tokenExpirationSchedule.unsubscribe();
        this.router.navigate(["login"]);
    }

    public addTokenExpirationSchedule(): void
    {
        if (TokenRepository.isTokenExist()) {
            let offset: number = 5000;  // Make it 5 sec before token expired
            let delay = TokenRepository.getTokenExpTime() - offset;
            this.tokenExpirationSchedule.unsubscribe(); // remove all previous schedulers

            this.tokenExpirationSchedule = Scheduler.queue.schedule(() => {
                this.refreshToken({"refresh_token": TokenRepository.getRefreshToken()});
            }, delay);
        }
    }

    private connectSocial(url: string): Observable<TokenResponse>
    {
        let connectWindow: Window = window.open(url, null, "menubar=no,toolbar=no,location=no");
        this.returlUrl = this.route.data["returnUrl"] || "/";

        return this.handleTokenResponse(
            new Observable((observer: Observer<TokenResponse>) => {

                let connectWindowSubscription = Observable
                    .interval(100)
                    .subscribe(() => {
                        if (connectWindow && connectWindow.closed) {
                            connectWindowSubscription.unsubscribe();
                            observer.error({"code": 410, "message": "Authorization aborted"});
                        }
                    });

                connectWindow.opener.onmessage = (event: MessageEvent) => {
                    connectWindow.close();
                    connectWindowSubscription.unsubscribe();
                    observer.next(event.data);
                }
            })
        );
    }

    private handleTokenResponse(observableTokenResponse: Observable<TokenResponse>): Observable<TokenResponse> 
    {
        observableTokenResponse = observableTokenResponse.share();

        observableTokenResponse.subscribe(
            (tokenResponse: TokenResponse) => this.onAuth.emit(tokenResponse),
            (tokenResponseFailure: ResponseFailure) => this.onAuth.error(tokenResponseFailure)
        );

        return observableTokenResponse;
    }
}