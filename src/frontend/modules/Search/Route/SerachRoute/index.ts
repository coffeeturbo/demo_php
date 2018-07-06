import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Device} from "../../../Application/Service/DeviceService";
import {FeedRoute} from "../../../Feed/Route/FeedRoute";
import {FeedService} from "../../../Feed/Service/FeedService";
import {SearchRESTService} from "../../Service/SearchRESTService";
import {Observable} from "rxjs/Observable";
import {RouteHelperService} from "../../../Application/Service/RouteHelperService";
import {FeedCacheService} from "../../../Feed/Service/FeedCacheService";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class SearchRoute extends FeedRoute {
    public searchInputControl = new FormControl('', [Validators.minLength(3)]);
    public device = Device;
    
    constructor(
        public route: ActivatedRoute, 
        public router: Router, 
        public feedService: FeedService,
        public feedCacheService: FeedCacheService,
        public routeHelper: RouteHelperService,
        public searchService: SearchRESTService
    ) {
        super(route, feedService, feedCacheService, routeHelper);
        
        this.route.params.subscribe(data => this.searchInputControl.patchValue(data["path"]))
    }

    public loadFeed(cursor: number) {
        if(this.isLoading || this.isFeedEnd)
            return;

        this.isLoading = true;

        this.searchService
            .search(Object.assign({}, this.route.snapshot.data.feedRequest, {params: {cursor: cursor}}))
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
        this.searchService
            .search(this.route.snapshot.data.feedRequest)
            .delayWhen(() => Observable.timer(delay))
            .finally(() => this.isLoading = false)
            .subscribe((feed) => this.feed = feed)
        ;
    }
}