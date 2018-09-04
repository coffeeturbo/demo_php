import {Injectable} from "@angular/core";
import {Observable} from "../../../node_modules/rxjs";
import {HttpClient} from "@angular/common/http";
import {Response} from "../../Application/Http/Response";
import {Profile} from "../../Profile/Entity/Profile";
import {SubscriptionsProfiles} from "../Entity/SubscriptionsProfiles";

@Injectable()
export class SubscriptionRESTService {

    constructor(private http: HttpClient) {}

    public subscribe(profileId: number): Observable<Response>
    {
        let url = `/protected/subscribe/profile/${profileId}/subscribe`;

        return this.http
            .put<Response>(url, null, {withCredentials: true})
        ;
    }

    public unsubscribe(profileId: number): Observable<Response>
    {
        let url = `/protected/subscribe/profile/${profileId}/unsubscribe`;

        return this.http
            .delete<Response>(url, {withCredentials: true})
        ;
    }
    
    public getProfileList(): Observable<SubscriptionsProfiles>
    {
        let url = `/protected/subscribe/profile/list`;

        return this.http
            .get<SubscriptionsProfiles>(url, {withCredentials: true})
        ;
    }
}