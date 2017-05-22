import {Injectable} from "@angular/core";
import {Locale} from "../Entity/Definitions";

@Injectable()
export class LocaleService {
    private defaultTocale: Locale = require('../../../app/config.json').locale;
    private locale: Locale;
    
    constructor() {
        this.locale = <Locale>localStorage.getItem('locale') || this.defaultTocale;
    }
    
    public getLocale(): Locale {
        return this.locale;
    }

    public setLocale(locale: Locale): void {
        this.locale = locale;
        localStorage.setItem('locale', locale);
    }
}
