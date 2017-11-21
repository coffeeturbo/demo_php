import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';
import {Feed} from "../Entity/Feed";
import {FeedService} from "./FeedService";
import {FeedCacheService} from "./FeedCacheService";

@Injectable()
export class FeedResolver implements Resolve<Feed> {

    constructor(private feedService: FeedService, private feedCacheService: FeedCacheService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Feed> {
        let feedObservable: Observable<Feed>;
        
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
    }
}