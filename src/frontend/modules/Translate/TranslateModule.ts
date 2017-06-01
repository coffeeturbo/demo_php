import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {TranslatePipe} from "./Pipe/TranslationPipe";
import {TranslationService} from "./Service/TranslationService";
import {LocaleService} from "./Service/LocaleService";

@NgModule({
    imports: [
        CommonModule
    ],
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