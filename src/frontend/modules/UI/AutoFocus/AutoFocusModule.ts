import {NgModule} from "@angular/core";
import {AutoFocusDirective} from "./Directive/AutoFocusDirective";

@NgModule({
    declarations: [
        AutoFocusDirective
    ],
    exports: [
        AutoFocusDirective
    ]
})
export class AutoFocusModule {}