import {NgModule} from "@angular/core";
import {PluralizePipe} from "./Pipe/PluralizePipe";

@NgModule({
    imports: [
        
    ],
    declarations: [
        PluralizePipe
    ],
    exports: [
        PluralizePipe
    ]
})
export class PluralizeModule {
}