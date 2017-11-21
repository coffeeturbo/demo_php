import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';

import {ProfileService} from "./ProfileService";
import {Feed} from "../../Feed/Entity/Feed";
import {FeedService} from "../../Feed/Service/FeedService";
import {FeedCacheService} from "../../Feed/Service/FeedCacheService";

@Injectable()
export class ProfileFeedResolver implements Resolve<Feed> {

    constructor(private profileService: ProfileService, private feedService: FeedService, private feedCacheService: FeedCacheService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Feed> {
        
        return this.profileService.onProfileResolve
            .first()
            .map(profile => profile.id)
            .flatMap((profileId => {

                let feedObservable: Observable<Feed>;
                route.routeConfig.data = {profile: profileId};
                
                try {
                    feedObservable = this.feedCacheService.getFeed(route.data.feedRequest).delay(1);
                } catch (e) {
                    feedObservable = this.feedService
                        .get(10, route.data.feedRequest)
                        .publishReplay(1)
                        .refCount()
                    ;

                    this.feedCacheService.saveFeed(route.data.feedRequest, feedObservable)
                }

                return feedObservable;
            }))
        ;

    }

}