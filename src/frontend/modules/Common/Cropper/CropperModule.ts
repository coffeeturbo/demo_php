import {NgModule} from "@angular/core";
import {CropperDirective} from "./Directive/CropperDirective";
import {CropperButtonDirective} from "./Directive/CropperButtonDirective";

@NgModule({
    imports:[
        
    ],
    declarations: [
        CropperDirective,
        CropperButtonDirective
    ],
    exports: [
        CropperDirective,
        CropperButtonDirective
    ]
})
export class CropperModule {} 