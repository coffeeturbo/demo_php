import {NgModule} from "@angular/core";

import {TranslatePipe} from "./Pipe/TranslationPipe";
import {TranslationService} from "./Service/TranslationService";
import {LocaleService} from "./Service/LocaleService";

@NgModule({
    declarations: [
        TranslatePipe,
    ],
    providers: [
        TranslationService,
        LocaleService,
    ],
    exports: [
        TranslatePipe
    ]
})
export class TranslateModule {

} 