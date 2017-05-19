import {Injectable} from "@angular/core";
import {Locale} from "../Entity/Definitions";

@Injectable()
export class LocaleService {
    private defaultTocale: Locale = require('../../../app/config.json').locale;

    public getLocale(): Locale {
        return <Locale>localStorage.getItem('locale') || this.defaultTocale;
    }

    public setLocale(locale: Locale): void {
        localStorage.setItem('locale', locale);
    }
}
