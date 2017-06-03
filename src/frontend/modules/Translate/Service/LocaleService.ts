import {Injectable} from "@angular/core";

import {Locale} from "../Entity/Definitions";
import {dictionariesNavigatorAliases} from "../../../translations/dictionaries";
import {Config} from "../../../app/config";

@Injectable()
export class LocaleService {
    private locale: Locale;
    
    constructor() {
        this.locale = <Locale>localStorage.getItem('locale') || LocaleService.getDefaultLocale();
    }
    
    public getLocale(): Locale {
        return this.locale;
    }

    public setLocale(locale: Locale): void {
        this.locale = locale;
        localStorage.setItem('locale', locale);
    }
    
    public static getDefaultLocale(): Locale {
        for (let locale in dictionariesNavigatorAliases) {
            if (dictionariesNavigatorAliases.hasOwnProperty(locale)) {

                let isLangExist = dictionariesNavigatorAliases[locale].filter(
                        (navigatorLanguage: string) => navigatorLanguage === navigator.language
                    ).length > 0;

                if (isLangExist) return <Locale>locale;
            }
        }
        return <Locale>Config.locale;
    }
}
