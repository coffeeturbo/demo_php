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
export class ProfileFeedResolver implements Resolve<Feed> {

    constructor(private profileService: ProfileService, private feedService: FeedService, private feedCacheService: FeedCacheService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Feed> {
        
        return this.profileService.onProfileResolve
            .first()
            .map(profile => profile.id)
            .flatMap(profileId => {
            
                let feedObservable: Observable<Feed>;
                let feedRequest: GetFeedRequest = {profile: profileId};
                
                try {
                    feedObservable = this.feedCacheService.getFeed(feedRequest).delay(1);
                } catch (e) {
                    feedObservable = this.feedService
                        .get(10, feedRequest)
                        .publishReplay(1)
                        .refCount()
                    ;

                    this.feedCacheService.saveFeed(feedRequest, feedObservable)
                }

                return feedObservable;
            })
        ;
    }
}