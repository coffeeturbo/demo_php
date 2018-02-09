import {NgModule} from "@angular/core";

import {LoaderComponent} from "./Component/Loader";

@NgModule({
    declarations: [
        LoaderComponent,
    ],
    exports: [
        LoaderComponent,
    ]
})
export class LoadingBoxModule {
} 