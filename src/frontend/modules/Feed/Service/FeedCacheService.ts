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
        try {
            let cache = this.get(feedRequest);
            this.cache[this.cache.indexOf(cache)] = {feedRequest, observable}; 
        } catch (e) {
            this.cache.push({feedRequest, observable});
        }
    }
    
    public saveScroll(feedRequest: GetFeedRequest, scroll: number) : void
    {
        let cache = this.get(feedRequest);

        cache.scroll = scroll;
    }
    
    public addToFeed(feedRequest: GetFeedRequest, feed: Feed) : void 
    {
        delete feedRequest.cursor;
        
        let cache = this.get(feedRequest);
        cache.observable = cache.observable.flatMap(oldFeed => [oldFeed.concat(feed)]);
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