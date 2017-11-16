import {Component, OnInit} from "@angular/core";
import {Feed} from "../../Entity/Feed";
import {ActivatedRoute} from "@angular/router";
import {FeedService} from "../../Service/FeedService";

@Component({
    templateUrl: "./template.pug",
})
export class FeedNewRoute implements OnInit {
    public feed: Feed;

    constructor(
        private route: ActivatedRoute,
        public feedService: FeedService
    ) {}

    ngOnInit() {
        this.feed = this.route.snapshot.data.feed;
    }

    private isLoading: boolean = false;
    private isFeedEnd: boolean = false;
    public loadFeed(cursor: number) {
        if(this.isLoading || this.isFeedEnd)
            return;

        this.isLoading = true;
        this.feedService
            .get(10, {cursor: cursor})
            .finally(() => this.isLoading = false)
            .subscribe((feed) => {
                this.isFeedEnd = feed.length == 0;
                this.feed = this.feed.concat(feed)
            })
        ;
    }
}
