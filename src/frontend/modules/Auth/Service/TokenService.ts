import {Inject, Injectable, Optional} from "@angular/core";
import {Token} from "../Entity/Token";
import * as jwtDecode from "jwt-decode";
import * as Cookies from 'universal-cookie';
import {RESPONSE} from "@nguniversal/express-engine/tokens";
import {Response} from "express";

export class TokenServiceConfig {
    tokenKey: string;
    refreshTokenKey: string;
}

@Injectable()
export class TokenService {
    private tokenKey: string;
    private refreshTokenKey: string;
    
    constructor(@Optional() config: TokenServiceConfig = {refreshTokenKey: "refresh_token", tokenKey: "token"}, @Inject('Cookies') private cookies: Cookies, @Optional() @Inject(RESPONSE) private res: Response){
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
        this.cookies.remove(this.tokenKey, { path: '/' });
        this.cookies.remove(this.refreshTokenKey, { path: '/' });
    }

    public saveToken(value: string): void
    {
        let expires: Date = new Date(new Date().getTime() + 60 * 60 * 24 * 365 * 1000);
        
        if(this.res) {
            this.res.cookie(this.tokenKey, value, {expires: expires, path: '/'});
        }
    
        this.cookies.set(this.tokenKey, value, {expires: expires, path: '/'});
    }

    public saveRefreshToken(value: string): void
    {
        let expires: Date = new Date(new Date().getTime() + 60 * 60 * 24 * 365 * 1000);

        if(this.res) {
            this.res.cookie(this.refreshTokenKey, value, {expires: expires, path: '/'});
        }

        this.cookies.set(this.refreshTokenKey, value, {expires: expires, path: '/'});
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
        return jwtDecode(this.getToken() || "");
    }
    
    public isTokenExpired() : boolean
    {
        return !this.getToken() || this.getTokenExpTime() < 0
    }
}