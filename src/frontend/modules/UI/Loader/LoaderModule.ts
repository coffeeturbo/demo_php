import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoaderComponent} from "./Component/Loader/index";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    declarations: [
        LoaderComponent,
    ],
    exports: [
        LoaderComponent
    ]
})
export class LoaderModule {} 