import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Device} from "../../../Application/Service/DeviceService";
import {FeedRoute} from "../../../Feed/Route/FeedRoute";
import {FeedService} from "../../../Feed/Service/FeedService";
import {SearchRESTService} from "../../Service/SearchRESTService";
import {SearchRequest} from "../../Http/Request/SerachRequest";
import {Observable} from "rxjs/Observable";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class SearchRoute extends FeedRoute {
    public searchInputControl = new FormControl('', [Validators.minLength(3)]);
    public device = Device;
    
    constructor(
        protected route: ActivatedRoute, 
        public router: Router, 
        public feedService: FeedService,
        public searchService: SearchRESTService
    ) {
        super(route, feedService);
        
        if(this.route.firstChild) {
            this.route.firstChild.params.subscribe(data => this.searchInputControl.patchValue(data["path"]))
        }
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