import {Component, Input} from '@angular/core';
import {Profile} from "../../Entity/Profile";
import {SubscribeService} from "../../../Subscribe/Service/SubscribeService";

@Component({
    selector: 'profile-subscribe',
    templateUrl: './template.pug',
})

export class ProfileSubscribeComponent {
    @Input() profile: Profile;
    public showUnsubscribeModal: boolean = false;

    constructor(public subscribeService: SubscribeService) {}
    
    public subscribe() {
        this.profile.subscribe.subscribers_total++;
        this.profile.subscribe.status = true;
        this.subscribeService.subscribe(this.profile).subscribe();
    }

    public unsubscribe() {
        this.profile.subscribe.subscribers_total--;
        this.profile.subscribe.status = false;
        this.showUnsubscribeModal = false;
        this.subscribeService.unsubscribe(this.profile).subscribe();
    }
}