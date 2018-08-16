import {Injectable} from "@angular/core";
import {Response} from "../../Application/Http/Response";
import {Observable} from "../../../node_modules/rxjs";
import {SubscribeRESTService} from "./SubscribeRESTService";
import {Profile} from "../../Profile/Entity/Profile";

@Injectable()
export class SubscribeService {
    constructor(private rest: SubscribeRESTService) {}

    public subscribe(profileId: number): Observable<Response>
    {
        return this.rest.subscribe(profileId);
    }

    public unsubscribe(profileId: number): Observable<Response>
    {
        return this.rest.unsubscribe(profileId);
    }
    
    public toggle(profile: Profile): Observable<Response>
    {
        if(profile.subscription) {
            return this.rest.unsubscribe(profile.id);
        } else {
            return this.rest.subscribe(profile.id);
        }
    }
}