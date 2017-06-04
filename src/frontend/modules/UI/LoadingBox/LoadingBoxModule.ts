import {NgModule} from "@angular/core";
import {LoaderComponent} from "./Component/Loader/index";

@NgModule({
    declarations: [
        LoaderComponent,
    ],
    providers: [
    ],
    exports: [
        LoaderComponent,
    ]
})
export class LoadingBoxModule {} 