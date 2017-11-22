import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';

import {ProfileService} from "./ProfileService";
import {Feed} from "../../Feed/Entity/Feed";
import {FeedService} from "../../Feed/Service/FeedService";
import {FeedCacheService} from "../../Feed/Service/FeedCacheService";
import {GetFeedRequest} from "../../Feed/Http/Request/GetFeedRequest";

@Injectable()
export class ProfileFeedRequestResolver implements Resolve<GetFeedRequest> {

    constructor(private profileService: ProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetFeedRequest> {
        
        return this.profileService.onProfileResolve
            .first()
            .map(profile => ({profile: profile.id}))
        ;
    }

}