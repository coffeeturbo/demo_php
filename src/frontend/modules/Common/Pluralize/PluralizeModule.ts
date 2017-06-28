import {NgModule} from "@angular/core";
import {PluralizePipe} from "./Pipe/PluralizePipe";

@NgModule({
    declarations: [
        PluralizePipe
    ],
    exports: [
        PluralizePipe
    ]
})
export class PluralizeModule {
}