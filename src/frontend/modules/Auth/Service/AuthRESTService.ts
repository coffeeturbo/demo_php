import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {SignInRequest} from "../Http/Request/SignInRequest";
import {SignUpRequest} from "../Http/Request/SignUpRequest";
import {RefreshTokenRequest} from "../Http/Request/RefreshTokenRequest";
import {TokenResponse} from "../Http/Response/TokenResponse";
import {HttpClient} from "@angular/common/http";
import {ChangePasswordRequest} from "../Http/Request/ChangePasswordRequest";
import {ChangePasswordResponse} from "../Http/Response/ChangePasswordResponse";

@Injectable()
export class AuthRESTService
{
    constructor(private http: HttpClient) {}

    public signIn(signInRequest: SignInRequest): Observable<TokenResponse>
    {
        let url = "/auth/sign-in";

        return this.http
            .post<TokenResponse>(url, signInRequest)
        ;
    }

    public signUp(signUpRequest: SignUpRequest): Observable<TokenResponse>
    {
        let url = "/auth/sign-up";

        return this.http
            .put<TokenResponse>(url, signUpRequest)
        ;
    }

    public refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<TokenResponse>
    {
        let url = "/auth/token/refresh";

        return this.http
            .post<TokenResponse>(url, refreshTokenRequest)
        ;
    }
    
    public changePassword(changePasswordRequest: ChangePasswordRequest): Observable<ChangePasswordResponse>   
    {
        let url = "/protected/auth/change-password";

        return this.http
            .post<TokenResponse>(url, changePasswordRequest, {withCredentials: true})
        ;
    }
}