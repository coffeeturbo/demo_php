import {Injectable} from "@angular/core";
import {Locale, Dictionary, Dictionaries} from "../Entity/Definitions";
import {LocaleService} from "./LocaleService";
import {dictionaries} from "../../../translations/dictionaries";

@Injectable()
export class TranslationService {
    public dictionaries: Dictionaries = dictionaries;

    constructor(private localeService: LocaleService) {}

    public translate(value: string): string {
        let locale: Locale = this.localeService.getLocale();

        if (!this.dictionaries.hasOwnProperty(this.localeService.getLocale()))
            throw new Error(`Dictionary ${locale} does not exist`);

        return this.dictionaries[locale][value] || value; 
    }
    
    addToDictionary(locale:Locale, dictionary:Dictionary) {
        if (!this.dictionaries.hasOwnProperty(locale))
            throw new Error(`Dictionary ${locale} does not exist`);
        
        Object.assign(this.dictionaries[locale], dictionary);
    }
}