import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Feed} from "../../Entity/Feed";
import {FeedService} from "../../Service/FeedService";
import {Observable} from "rxjs/Observable";
import {RouteHelperService} from "../../../Application/Service/RouteHelperService";
import {FeedCacheService} from "../../Service/FeedCacheService";

@Component({
    templateUrl: "./template.pug",
})
export class FeedRoute implements OnInit {
    public isLoading: boolean = false;
    public isFeedEnd: boolean = false;

    public feed: Feed;

    constructor(
        public route: ActivatedRoute,
        public feedService: FeedService,
        public feedCacheService: FeedCacheService,
        public routeHelper: RouteHelperService
    ) {}

    ngOnInit() {
        this.route.data.subscribe(data => this.feed = data.feed || []);
    }

    public loadFeed(cursor: number) {
        if(this.isLoading || this.isFeedEnd)
            return;

        this.isLoading = true;
        this.feedService
            .get(10, {...{}, ...this.route.snapshot.data.feedRequest, ...{cursor: cursor}})
            .finally(() => this.isLoading = false)
            .subscribe((feed) => {
                this.isFeedEnd = feed.length < 10;
                this.feed = this.feed.concat(feed)
            })
        ;
    }
    
    public refresh() {
        if(this.isLoading)
            return;

        let delay = new Date(Date.now() + 500);
        this.isLoading = true;
        
        let feedObservable = this.feedService
            .get(10, this.route.snapshot.data.feedRequest)
            .delayWhen(() => Observable.timer(delay))
            .finally(() => this.isFeedEnd = this.isLoading = false)
            .publishReplay(1)
            .refCount()
        ;
        
        feedObservable.subscribe((feed) => this.feed = feed);

        this.feedCacheService.saveFeed(this.route.snapshot.data.feedRequest, feedObservable)
        
    }
}
