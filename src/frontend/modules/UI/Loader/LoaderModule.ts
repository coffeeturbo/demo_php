import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoaderComponent} from "./Component/Loader/index";
import {LoadingBarComponent} from "./Component/LoadingBar/index";
import {LoadingBarService} from "./Service/LoadingIndicatorService";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    declarations: [
        LoaderComponent,
        LoadingBarComponent
    ],
    providers: [
        LoadingBarService
    ],
    exports: [
        LoaderComponent,
        LoadingBarComponent
    ]
})
export class LoaderModule {} 