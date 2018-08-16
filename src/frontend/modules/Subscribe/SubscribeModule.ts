import {NgModule} from "@angular/core";
import {SubscribeRESTService} from "./Service/SubscribeRESTService";
import {SubscribeService} from "./Service/SubscribeService";

@NgModule({
    providers: [
        SubscribeRESTService,
        SubscribeService
    ]
})
export class SubscribeModule {} 