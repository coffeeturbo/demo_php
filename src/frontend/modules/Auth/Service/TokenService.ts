import {Inject, Injectable, Optional} from "@angular/core";
import {Token} from "../Entity/Token";
import {JwtHelper, tokenNotExpired} from "angular2-jwt";
import * as Cookies from 'universal-cookie';

export class TokenServiceConfig {
    tokenKey: string;
    refreshTokenKey: string;
}

@Injectable()
export class TokenService {
    private tokenKey: string;
    private refreshTokenKey: string;
    
    constructor(@Optional() config: TokenServiceConfig = {refreshTokenKey: "refresh_token", tokenKey: "token"}, @Inject('Cookies') private cookies: Cookies){
        this.tokenKey = config.tokenKey;
        this.refreshTokenKey = config.refreshTokenKey;
    }

    public getToken(): string
    {
        return this.cookies.get(this.tokenKey);
    }

    public getRefreshToken(): string
    {
        return this.cookies.get(this.refreshTokenKey);
    }

    public removeTokens(): void
    {
        this.cookies.remove(this.tokenKey);
        this.cookies.remove(this.refreshTokenKey);
    }

    public saveToken(value: string): void
    {
        let expires: Date = new Date(new Date().getTime() + 60 * 60 * 24 * 365 * 1000);
        this.cookies.set(this.tokenKey, value, {expires: expires});
    }

    public saveRefreshToken(value: string): void
    {
        let expires: Date = new Date(new Date().getTime() + 60 * 60 * 24 * 365 * 1000);
        this.cookies.set(this.refreshTokenKey, value, {expires: expires});
    }

    public getTokenExpTime(): number
    {
        return (this.decodeToken().exp * 1000) - Date.now();
    }

    public isTokenExist(): boolean
    {
        return !!this.getToken();
    }

    public decodeToken(): Token
    {
        let jwtHelper: JwtHelper = new JwtHelper();
        return jwtHelper.decodeToken(this.getToken());
    }
    
    public tokenNotExpired() : boolean
    {
        return typeof document !== "undefined" && tokenNotExpired(null, this.getToken());
    }
}