import {NgModule} from "@angular/core";
import {EmptyInputDetectorDirective} from "./Directive/EmptyInputDetectorDirective";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AutoSizeDirective} from "./Directive/AutoSizeDirective";

@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        EmptyInputDetectorDirective,
        AutoSizeDirective
    ],
    exports: [
        EmptyInputDetectorDirective,
        AutoSizeDirective
    ]
})
export class MaterialFormModule {} 