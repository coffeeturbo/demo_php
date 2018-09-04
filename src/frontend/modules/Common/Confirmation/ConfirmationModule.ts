import {NgModule} from "@angular/core";
import {ConfirmationComponent} from "./Component/Confirmation";
import {TranslationModule} from "@angular-addons/translate";

@NgModule({
    imports: [
        TranslationModule
    ],
    declarations: [
        ConfirmationComponent
    ],
    exports: [
        ConfirmationComponent
    ]
})
export class ConfirmationModule {} 