import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoaderComponent} from "./Component/Loader/index";

@NgModule({
    imports: [
        // CommonModule,
        // FormsModule,
        // ReactiveFormsModule,
        // HttpModule,
    ],
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