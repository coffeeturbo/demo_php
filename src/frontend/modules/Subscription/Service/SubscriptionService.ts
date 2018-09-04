import {Injectable} from "@angular/core";
import {Response} from "../../Application/Http/Response";
import {Observable} from "../../../node_modules/rxjs";
import {SubscriptionRESTService} from "./SubscriptionRESTService";
import {Profile} from "../../Profile/Entity/Profile";
import {SubscriptionsProfiles} from "../Entity/SubscriptionsProfiles";

@Injectable()
export class SubscriptionService {
    
    public subscriptionsProfiles: SubscriptionsProfiles;
    
    constructor(private rest: SubscriptionRESTService) {}

    public subscribe(profile: Profile): Observable<Response>
    {
        this.subscriptionsProfiles.unshift(profile);
        return this.rest.subscribe(profile.id);
    }

    public unsubscribe(profile: Profile): Observable<Response>
    {
        let index = this.subscriptionsProfiles.findIndex(subscribeProfile => subscribeProfile.id == profile.id);
        this.subscriptionsProfiles.splice(index,1);
        return this.rest.unsubscribe(profile.id);
    }
    
    public getProfileList(): Observable<SubscriptionsProfiles>
    {
        return this.rest.getProfileList()
            .do(subscriptionsProfiles => this.subscriptionsProfiles = subscriptionsProfiles)
        ;
    }
}