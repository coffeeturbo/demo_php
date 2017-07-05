import {NgModule} from "@angular/core";
import {CropperService} from "./Service/CropperService";
import {FocusDirective} from "./Directive/CropperDirective";

@NgModule({
    imports:[
        
    ],
    declarations: [
        FocusDirective
    ],
    providers: [
        CropperService
    ],
    exports: [
        FocusDirective
    ]
})
export class CropperModule {} 