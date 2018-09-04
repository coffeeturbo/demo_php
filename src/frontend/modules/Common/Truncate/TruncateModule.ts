import {NgModule} from "@angular/core";
import {TruncatePipe} from "./Pipe/TruncatePipe";

@NgModule({
    declarations: [
        TruncatePipe
    ],
    exports: [
        TruncatePipe
    ]
})
export class TruncateModule {} 