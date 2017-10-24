import {Pipe, PipeTransform} from "@angular/core";
import {Locale, TranslationService} from "@angular-addons/translate";
import * as moment from "moment";

@Pipe({
    name: "post_created",
})
export class PostCreatedPipe implements PipeTransform {
    constructor(private translationService: TranslationService) {}
    transform(value: string) {
        let locale: Locale = this.translationService.getLocale();
        let format: string = "MMMM D";
        switch (locale) {
            case "RU" :
                format = "D MMMM";
                moment.locale(locale);
        }

        return moment(value).fromNow();
    }
}
