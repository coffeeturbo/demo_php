import {NgModule} from "@angular/core";
import {CropperDirective} from "./Directive/CropperDirective";
import {CropperButtonDirective} from "./Directive/CropperButtonDirective";
import {CropperService2} from "./Service/CropperService2";

@NgModule({
    imports:[
        
    ],
    declarations: [
        CropperDirective,
        CropperButtonDirective
    ],
    providers: [
        CropperService2
    ],
    exports: [
        CropperDirective,
        CropperButtonDirective
    ]
})
export class CropperModule {} 