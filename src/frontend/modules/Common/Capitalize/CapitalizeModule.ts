import {NgModule} from "@angular/core";
import {CapitalizePipe} from "./Pipe/CapitalizePipe";

@NgModule({
    declarations: [
        CapitalizePipe
    ],
    exports: [
        CapitalizePipe
    ]
})
export class CapitalizeModule {
}