import {JwtHelper} from "angular2-jwt";

const tokenKey: string = "token";
const refreshTokenKey: string = "refresh_token";
const jwtHelper: JwtHelper = new JwtHelper();

export class TokenRepository
{
    public static getToken(): string
    {
        return localStorage.getItem(tokenKey)
    }

    public static getRefreshToken(): string
    {
        return localStorage.getItem(refreshTokenKey)
    }

    public static removeTokens(): void
    {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(refreshTokenKey);
    }
    
    public static saveToken(value: string): void
    {
        localStorage.setItem(tokenKey, value);
    }

    public static saveRefreshToken(value: string): void
    {
        localStorage.setItem(refreshTokenKey, value);
    }

    public static getTokenExpTime(): number
    {
        return (jwtHelper.decodeToken(TokenRepository.getToken()).exp  * 1000) - Date.now();
    }
    
    public static isTokenExist(): boolean
    {
        return !!TokenRepository.getToken();
    }
}