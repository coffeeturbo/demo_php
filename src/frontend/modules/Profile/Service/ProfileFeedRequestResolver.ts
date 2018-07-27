import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';

import {ProfileService} from "./ProfileService";
import {GetFeedRequest} from "../../Feed/Http/Request/GetFeedRequest";
import {FeedRequestService} from "../../Feed/Service/FeedRequestService";
import {ProfileResolver} from "./ProfileResolver";

@Injectable()
export class ProfileFeedRequestResolver implements Resolve<GetFeedRequest> {

    constructor(private profileService: ProfileService, private feedRequestService: FeedRequestService, private profileResolver: ProfileResolver) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetFeedRequest> {
        return this.profileResolver.onResolve
            .first()
            .map(profile => (profile ? {profile: profile.id} : null))
            .do(feedRequest => this.feedRequestService.onFeedRequestResolve.emit(feedRequest))
        ;
    }
}