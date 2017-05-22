import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {TranslatePipe} from "./Pipe/TranslationPipe";
import {TranslationService} from "./Service/TranslationService";
import {LocaleService} from "./Service/LocaleService";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    declarations: [
        TranslatePipe,
    ],
    providers: [
        TranslationService,
        LocaleService,
    ],
    exports:[
        TranslatePipe
    ]
})
export class TranslateModule {

} 