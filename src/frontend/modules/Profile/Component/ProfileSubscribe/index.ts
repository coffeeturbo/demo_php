import {Component, Input} from '@angular/core';
import {Profile} from "../../Entity/Profile";
import {SubscriptionService} from "../../../Subscription/Service/SubscriptionService";

@Component({
    selector: 'profile-subscribe',
    templateUrl: './template.pug',
})

export class ProfileSubscribeComponent {
    @Input() profile: Profile;
    public showUnsubscribeModal: boolean = false;

    constructor(public subscriptionService: SubscriptionService) {}
    
    public subscribe() {
        this.profile.subscribe.subscribers_total++;
        this.profile.subscribe.status = true;
        this.subscriptionService.subscribe(this.profile).subscribe();
    }

    public unsubscribe() {
        this.profile.subscribe.subscribers_total--;
        this.profile.subscribe.status = false;
        this.showUnsubscribeModal = false;
        this.subscriptionService.unsubscribe(this.profile).subscribe();
    }
}