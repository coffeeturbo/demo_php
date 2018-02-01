import {EventEmitter, Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Scheduler, Subscription} from "rxjs";
import {tokenNotExpired} from "angular2-jwt";

import {AuthRESTService} from "./AuthRESTService";
import {SignInRequest} from "../Http/Request/SignInRequest";
import {SignUpRequest} from "../Http/Request/SignUpRequest";
import {TokenResponse} from "../Http/Response/TokenResponse";
import {RefreshTokenRequest} from "../Http/Request/RefreshTokenRequest";
import {Token} from "../Entity/Token";
import {Roles} from "../Entity/Role";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {OAuthService} from "./OAuthService";
import {TokenService} from "./TokenService";

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
    public onAuthSuccess = new EventEmitter<TokenResponse>();
    public onAuthFailure = new EventEmitter<ResponseFailure>();

    private tokenExpirationSchedule: Subscription = new Subscription();
    private returnUrl: string = "/";

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private rest: AuthRESTService,
        private oAuth: OAuthService,
        public tokenService: TokenService
    ) {
        this.onAuthSuccess.subscribe(
            (tokenResponse: TokenResponse) => {
                this.tokenService.saveToken(tokenResponse.token);

                if(tokenResponse.refresh_token) {
                    this.tokenService.saveRefreshToken(tokenResponse.refresh_token);
                    this.addTokenExpirationSchedule();
                }

                if (this.returnUrl) {
                    this.router.navigateByUrl(this.returnUrl);
                }
            }
        );
        this.onAuthFailure.subscribe(() => this.signOut())
    }

    public isSignedIn(): boolean
    {
        return this.tokenService.tokenNotExpired();
    }

    public getRoles(): Roles
    {
        let tokenData: Token = this.tokenService.decodeToken();
        return tokenData.roles;
    }

    public signIn(body: SignInRequest): Observable<TokenResponse>
    {
        this.returnUrl = this.route.data["returnUrl"] || "/";
        return this.handleTokenResponse(this.rest.signIn(body));
    }

    public signUp(body: SignUpRequest): Observable<TokenResponse>
    {
        this.returnUrl = "/";
        return this.handleTokenResponse(this.rest.signUp(body));
    }

    public refreshToken(body: RefreshTokenRequest): Observable<TokenResponse>
    {
        this.returnUrl = null;
        return this.handleTokenResponse(this.rest.refreshToken(body));
    }

    public connectVK(): Observable<TokenResponse>
    {
        this.returnUrl = this.route.data["returnUrl"] || "/";
        return this.handleTokenResponse(this.oAuth.connectVK());
    }

    public connectFacebook(): Observable<TokenResponse>
    {
        this.returnUrl = this.route.data["returnUrl"] || "/";
        return this.handleTokenResponse(this.oAuth.connectFacebook());
    }

    public signOut(): void
    {
        this.tokenService.removeTokens();
        this.tokenExpirationSchedule.unsubscribe();
    }

    public addTokenExpirationSchedule(): void
    {
        if (this.tokenService.isTokenExist()) {
            let offset: number = 5000;  // Make it 5 sec before token expired
            let delay = this.tokenService.getTokenExpTime() - offset;
            this.tokenExpirationSchedule.unsubscribe(); // remove all previous schedulers

            this.tokenExpirationSchedule = Scheduler.queue.schedule(() => {
                this.refreshToken({"refresh_token": this.tokenService.getRefreshToken()});
            }, delay);
        }
    }

    private handleTokenResponse(observableTokenResponse: Observable<TokenResponse>): Observable<TokenResponse>
    {
        observableTokenResponse = observableTokenResponse.share();

        observableTokenResponse.subscribe(
            (tokenResponse: TokenResponse) => this.onAuthSuccess.emit(tokenResponse),
            (tokenResponseFailure: ResponseFailure) => this.onAuthFailure.emit(tokenResponseFailure)
        );

        return observableTokenResponse;
    }
}