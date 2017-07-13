import {NgModule} from "@angular/core";
import {ChromeAutoFillFix} from "./Directive/ChromeAutoFillDirective";

@NgModule({
    declarations: [
        ChromeAutoFillFix
    ],
    exports: [
        ChromeAutoFillFix
    ]
})
export class ChromeAutoFillModule {
}