import {Component, Input} from '@angular/core';
import {Profile} from "../../Entity/Profile";
import {SubscribeService} from "../../../Subscribe/Service/SubscribeService";

@Component({
    selector: 'profile-subscribe',
    templateUrl: './template.pug',
})

export class ProfileSubscribeComponent {
    @Input() profile: Profile;
    public subscribeLoading: boolean = false;
    public showUnsubscribeModal: boolean = false;

    constructor(public subscribeService: SubscribeService) {}
    
    public subscribe() {
        this.subscribeLoading = true;
        this.subscribeService.subscribe(this.profile.id)
            .finally(()=> {
                this.profile.subscription = true;
                this.subscribeLoading = false;
            })
            .subscribe();
    }

    public unsubscribe() {
        this.subscribeLoading = true;
        this.showUnsubscribeModal = false;
        this.subscribeService.unsubscribe(this.profile.id)
            .finally(()=> {
                this.profile.subscription = false;
                this.subscribeLoading = false;
            })
            .subscribe();
    }
}