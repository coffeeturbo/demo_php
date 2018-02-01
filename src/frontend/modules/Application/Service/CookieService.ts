import * as Cookies from 'universal-cookie';
import {Optional} from "@angular/core";


export class CookieService {
    private cookies: Cookies;
    constructor(@Optional() cookies: string | string[] | null = null) {
        this.cookies = new Cookies(cookies);
    }
    
    get(key: string) {
        console.log(this.cookies.get(key));
        return this.cookies.get(key); 
    }

    remove(key: string) {
        return this.cookies.remove(key);
    }

    put(key:string, value: any, options: any) {
        return this.cookies.set(key, value, options);
    }
}