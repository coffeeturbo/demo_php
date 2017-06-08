import {NgModule} from "@angular/core";

import {TranslationPipe} from "./Pipe/TranslationPipe";
import {TranslationService} from "./Service/TranslationService";
import {LocaleService} from "./Service/LocaleService";

@NgModule({
    declarations: [
        TranslationPipe,
    ],
    providers: [
        TranslationService,
        LocaleService,
    ],
    exports: [
        TranslationPipe
    ]
})
export class TranslationModule {

} 