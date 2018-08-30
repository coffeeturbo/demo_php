import {NgModule} from "@angular/core";
import {SubscriptionRESTService} from "./Service/SubscriptionRESTService";
import {SubscriptionService} from "./Service/SubscriptionService";

@NgModule({
    providers: [
        SubscriptionRESTService,
        SubscriptionService
    ]
})
export class SubscriptionModule {} 