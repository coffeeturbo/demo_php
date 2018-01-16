import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {FeedRESTService} from "./FeedRESTService";
import {Feed} from "../Entity/Feed";
import {GetFeedRequest} from "../Http/Request/GetFeedRequest";
import {FeedCacheService} from "./FeedCacheService";

@Injectable()
export class FeedService {
    
    constructor(private rest: FeedRESTService, private feedCacheService: FeedCacheService) {}

    public get(limit: number, getFeedRequest?: GetFeedRequest): Observable<Feed>
    {
        
        return this.rest.get(limit, getFeedRequest).do((feed)=>{
            if(getFeedRequest.cursor) {
                this.feedCacheService.addToFeed(getFeedRequest, feed)
            }
        });
    }
}