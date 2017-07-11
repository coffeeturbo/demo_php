import {NgModule} from "@angular/core";
import {MaterialInputDirective} from "./Directive/MaterialInputDirective";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        MaterialInputDirective
    ],
    exports: [
        MaterialInputDirective
    ]
})
export class MaterialFormModule {} 