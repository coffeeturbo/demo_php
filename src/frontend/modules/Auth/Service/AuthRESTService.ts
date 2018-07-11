import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {SignInRequest} from "../Http/Request/SignInRequest";
import {SignUpRequest} from "../Http/Request/SignUpRequest";
import {RefreshTokenRequest} from "../Http/Request/RefreshTokenRequest";
import {TokenResponse} from "../Http/Response/TokenResponse";
import {HttpClient} from "@angular/common/http";
import {ChangePasswordRequest} from "../Http/Request/ChangePasswordRequest";
import {ChangePasswordResponse} from "../Http/Response/ChangePasswordResponse";
import {RecoverPasswordByEmailRequest} from "../Http/Request/RecoverPasswordByEmailRequest";
import {RecoverPasswordByEmailConfirm} from "../Http/Request/RecoverPasswordByEmailConfirm";

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
    
    public sendEmailVerificationCode(): Observable<{/*@TODO*/}>
    {
        let url = "/protected/auth/send-confirm";

        return this.http
            .post<{/*@TODO*/}>(url, null, {withCredentials: true})
        ;
    }

    public confirmEmail(code: string): Observable<TokenResponse>
    {
        let url = `/protected/auth/confirm-mail/${code}`;

        return this.http
            .get<TokenResponse>(url, {withCredentials: true})
        ;
    }
    
    public recoverPasswordByEmail(recoverPasswordByEmail: RecoverPasswordByEmailRequest): Observable<{/*@TODO*/}>
    {
        let url = `/auth/password-recovery/email-send`;

        return this.http
            .put<{/*@TODO*/}>(url, recoverPasswordByEmail)
        ;
    }
    
    public recoverPasswordByEmailConfirm(recoverPasswordByEmailConfirm: RecoverPasswordByEmailConfirm): Observable<TokenResponse>
    {
        let url = `/auth/password-recovery/email-recover/confirm`;
        
        return this.http
            .post<TokenResponse>(url, recoverPasswordByEmailConfirm)
        ;
    }
}