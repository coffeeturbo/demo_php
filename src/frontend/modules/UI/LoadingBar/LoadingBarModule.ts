import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {LoadingBarService} from "./Service/LoadingBarService";
import {LoadingBarEvents} from "./Event/LoadingBarEvents";
import {LoadingBarSubscriptions} from "./Subscription/LoadingBarSubscriptions";
import {LoadingBarDirective} from "./Directive/LoadingBarDirective";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    declarations: [
        LoadingBarDirective
    ],
    providers: [
        LoadingBarService,
        LoadingBarEvents,
        LoadingBarSubscriptions
    ],
    exports: [
        LoadingBarDirective
    ]
})
export class LoadingBarModule {} 