import {Injectable} from "@angular/core";
import {JwtHelper} from "angular2-jwt";

const tokenKey: string = "token";
const refreshTokenKey: string = "refresh_token";
const jwtHelper: JwtHelper = new JwtHelper();

@Injectable()
export class TokenStorageService
{
    public getToken() : string
    {
        return localStorage.getItem(tokenKey)
    }

    public getRefreshToken() : string
    {
        return localStorage.getItem(refreshTokenKey)
    }

    public removeTokens() : void
    {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshTokenKey);
    }
    
    public saveToken(value: string)
    {
        localStorage.setItem(tokenKey, value);
    }

    public saveRefreshToken(value: string)
    {
        localStorage.setItem(refreshTokenKey, value);
    }

    public getTokenExpTime() : number
    {
        return (jwtHelper.decodeToken(this.getToken()).exp  * 1000) - Date.now();
    }
    
    public isTokenExist() : boolean
    {
        return !!this.getToken();
    }
}