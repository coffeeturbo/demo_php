import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

import {GetFeedRequest} from "../../Feed/Http/Request/GetFeedRequest";
import {FeedRequestService} from "../../Feed/Service/FeedRequestService";
import {ProfileResolver} from "../../Profile/Service/ProfileResolver";

@Injectable()
export class VoteFeedRequestResolver implements Resolve<GetFeedRequest> {

    constructor(private feedRequestService: FeedRequestService, private profileResolver: ProfileResolver) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetFeedRequest> {
        return this.profileResolver.onResolve
            .first()
            .map(profile => (profile ? {profile: profile.id} : {}))
            .map(feedRequest => <GetFeedRequest>{...feedRequest, ...{vote_type: "all", sort: "rating"}})
            .do(feedRequest => this.feedRequestService.onFeedRequestResolve.emit(feedRequest))
        ;
    }
}