import {NgModule} from "@angular/core";
import {EmptyInputDetectorDirective} from "./Directive/EmptyInputDetectorDirective";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        EmptyInputDetectorDirective
    ],
    exports: [
        EmptyInputDetectorDirective
    ]
})
export class MaterialFormModule {} 