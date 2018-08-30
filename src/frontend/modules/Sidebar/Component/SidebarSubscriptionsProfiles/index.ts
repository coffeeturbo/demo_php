import {Component, HostBinding, OnInit} from "@angular/core";

import {ProfileService} from "../../../Profile/Service/ProfileService";
import {SubscriptionService} from "../../../Subscription/Service/SubscriptionService";
import {AuthService} from "../../../Auth/Service/AuthService";

@Component({
    selector: "sidebar-subscriptions-profiles",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class SidebarSubscriptionsProfilesComponent implements OnInit {
    constructor(public subscriptionService: SubscriptionService) {}

    ngOnInit() {
        this.subscriptionService.getProfileList().subscribe();
    }
}
