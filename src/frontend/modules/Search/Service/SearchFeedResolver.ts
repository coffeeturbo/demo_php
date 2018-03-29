import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';
import {Feed} from "../../Feed/Entity/Feed";
import {FeedService} from "../../Feed/Service/FeedService";
import {FeedCacheService} from "../../Feed/Service/FeedCacheService";
import {FeedRequestService} from "../../Feed/Service/FeedRequestService";
import {SearchRESTService} from "./SearchRESTService";

@Injectable()
export class SearchFeedResolver implements Resolve<Feed> {

    constructor(
        private feedService: FeedService, 
        private feedCacheService: FeedCacheService,
        private feedRequestService: FeedRequestService,
        private searchService: SearchRESTService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Feed> | Feed 
    {
        let searchRequestObservable = route.data.searchRequest ? Observable.of(route.data.searchRequest) : this.feedRequestService.onFeedRequestResolve;
        
        return searchRequestObservable.first()
            .flatMap(serachRequest => {
                let feedResolver = this.searchService
                        .search(serachRequest)
                        .publishReplay(1)
                        .refCount()
                    ; 
                    this.feedCacheService.saveFeed(serachRequest, feedResolver);
                    
                    return feedResolver
                }
            )
        ;
    }
}