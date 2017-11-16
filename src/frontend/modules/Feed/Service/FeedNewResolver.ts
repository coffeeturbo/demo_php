import {EventEmitter, Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';
import {Feed} from "../Entity/Feed";
import {FeedService} from "./FeedService";

@Injectable()
export class FeedNewResolver implements Resolve<Feed> {

    private cache;
    constructor(private feedService: FeedService) {}

    resolve(): Observable<Feed> {

        let onFeedLoad = new EventEmitter<Feed>();

        if(!this.cache) {
            this.cache = this.feedService
                .get(10)
                .publishReplay(1)
                .refCount()
            ;
        }

        this.cache.delay(1).subscribe(feed => {
            onFeedLoad.emit(<Feed>feed);
            onFeedLoad.complete();
        });
            

        return onFeedLoad;
    }
}