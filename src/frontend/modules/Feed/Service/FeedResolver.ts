import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';
import {Feed} from "../Entity/Feed";
import {FeedService} from "./FeedService";
import {FeedCacheService} from "./FeedCacheService";
import {makeStateKey, StateKey, TransferState} from "@angular/platform-browser";

@Injectable()
export class FeedResolver implements Resolve<Feed> {

    constructor(private feedService: FeedService, private feedCacheService: FeedCacheService, private transferState: TransferState) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Feed> | Feed {
        let feedResolver: Observable<Feed>;
        
        
        try {
            feedResolver = this.feedCacheService.getFeed(route.data.feedRequest).delay(1);
        } catch (e) {
            let feedStateKey: StateKey<Feed> = makeStateKey<Feed>("Feed " + JSON.stringify(route.data.feedRequest));
            
            if(this.transferState.hasKey(feedStateKey)) {
                feedResolver = Observable.of(this.transferState.get(feedStateKey, null as Feed)).delay(1);
            } else {
                feedResolver = this.feedService
                    .get(10, route.data.feedRequest)
                    .publishReplay(1)
                    .refCount()
                    .do((feed) => this.transferState.set(feedStateKey, feed as Feed))
                ;
            }

            this.feedCacheService.saveFeed(route.data.feedRequest, feedResolver)
        }

        return feedResolver;
    }
}