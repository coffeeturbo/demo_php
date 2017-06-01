import {Injectable} from "@angular/core";

import {Locale, Dictionary, Dictionaries} from "../Entity/Definitions";
import {LocaleService} from "./LocaleService";
import {dictionaries} from "../../../translations/dictionaries";

@Injectable()
export class TranslationService {
    public dictionaries: Dictionaries = dictionaries;

    constructor(private localeService: LocaleService) {}

    public translate(value: string): string {

        if (!this.dictionaries.hasOwnProperty(this.localeService.getLocale()))
            throw new Error(`Locale ${this.localeService.getLocale()} does not exist`);

        return this.dictionaries[this.localeService.getLocale()][value] || value;
    }

    public addToDictionary(locale: Locale, dictionary: Dictionary) {
        if (!this.dictionaries.hasOwnProperty(locale))
            throw new Error(`Locale ${locale} does not exist`);

        Object.assign(this.dictionaries[locale], dictionary);
    }
}