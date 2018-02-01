import {JwtHelper} from "angular2-jwt";

import {Token} from "../Entity/Token";
import {Config} from "../../../app/config";
import {AuthService} from "../Service/AuthService";

const localStorage = typeof window !='undefined' ? window.localStorage : { getItem(key: any): any { return null }, removeItem(key: any) {}, setItem(key: any, val: any) {} };


export class TokenRepository
{
    private static tokenKey: string = Config.auth.token_key;
    private static refreshTokenKey: string = Config.auth.refresh_token_key;

    public static getToken(): string
    {
        return localStorage.getItem(this.tokenKey)
    }

    public static getRefreshToken(): string
    {
        return localStorage.getItem(this.refreshTokenKey)
    }

    public static removeTokens(): void
    {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.refreshTokenKey);
    }

    public static saveToken(value: string): void
    {
        document.cookie = `${this.tokenKey}=${value}`;
        localStorage.setItem(this.tokenKey, value);
    }

    public static saveRefreshToken(value: string): void
    {
        document.cookie = `${this.refreshTokenKey}=${value}`;
        localStorage.setItem(this.refreshTokenKey, value);
    }

    public static getTokenExpTime(): number
    {
        return (this.decodeToken().exp * 1000) - Date.now();
    }

    public static isTokenExist(): boolean
    {
        return !!this.getToken();
    }
    
    public static decodeToken(): Token
    {
        let jwtHelper: JwtHelper = new JwtHelper();
        return jwtHelper.decodeToken(this.getToken());
    }
}