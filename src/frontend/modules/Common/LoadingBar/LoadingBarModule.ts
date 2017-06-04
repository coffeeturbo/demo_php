import {NgModule} from "@angular/core";

import {LoadingBarService} from "./Service/LoadingBarService";
import {LoadingBarEvents} from "./Event/LoadingBarEvents";
import {LoadingBarSubscriptions} from "./Subscription/LoadingBarSubscriptions";
import {LoadingBarDirective} from "./Directive/LoadingBarDirective";

@NgModule({
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
export class LoadingBarModule {
} 