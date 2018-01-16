import {Injectable} from "@angular/core";
import {GetFeedRequest} from "../Http/Request/GetFeedRequest";
import {Observable} from "rxjs/Observable";
import {Feed} from "../Entity/Feed";
import {FeedCache} from "../Entity/FeedCache";

@Injectable()
export class FeedCacheService {

    private cache: FeedCache[] = [];

    public getFeed(feedRequest: GetFeedRequest): Observable<Feed>
    {
        return this.get(feedRequest).observable;
    }

    public saveFeed(feedRequest: GetFeedRequest, observable: Observable<Feed>): void
    {
        this.cache.push({feedRequest, observable});
    }
    
    public saveScroll(feedRequest: GetFeedRequest, scroll: number)
    {
        let cache = this.cache.find(
            item => JSON.stringify(item.feedRequest) == JSON.stringify(feedRequest)
        );

        if(!cache) {
            throw new Error(`Feed is not cached`);
        }

        cache.scroll = scroll;
    }
    
    public addToFeed(feedRequest: GetFeedRequest, feed: Feed) 
    {
        delete feedRequest.cursor;
        
        let cache = this.cache.find(
            item => JSON.stringify(item.feedRequest) == JSON.stringify(feedRequest)
        );

        if(cache) {
            cache.observable = cache.observable.flatMap(oldFeed => [oldFeed.concat(feed)])
        }
    }
    
    public getScroll(feedRequest: GetFeedRequest): number
    {
        let scroll = this.get(feedRequest).scroll;
        
        if(!scroll) {
            throw new Error(`Scroll is not cached`);
        }
        
        return scroll;
    }
    
    private get(feedRequest: GetFeedRequest): FeedCache
    {
        let cache = this.cache.find(
            item => JSON.stringify(item.feedRequest) == JSON.stringify(feedRequest)
        );

        if(!cache) {
            throw new Error(`Feed is not cached`);
        }

        return cache;
    }
}