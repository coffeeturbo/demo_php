import {EventEmitter, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';
import {Feed} from "../Entity/Feed";
import {FeedService} from "./FeedService";

@Injectable()
export class FeedResolver implements Resolve<Feed> {

    private cache: {
        id: number;
        observable: Observable<Feed>;
    }[] = [];

    private getCache(id: number) {
        let cache = this.cache.find(item => item.id == id);
        if(!cache) {
            throw new Error(`Feed with id "${id}" is not cached`);
        }
        return cache;
    }

    private setCache(id, observable) {
        this.cache.push({id, observable})
    }

    constructor(private feedService: FeedService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Feed> {
        let feedObservable: Observable<Feed>;
        
        try {
            feedObservable = this.getCache(route.data.cacheId).observable.delay(1);
        } catch (e) {
            feedObservable = this.feedService
                .get(10, route.data.feedRequest)
                .publishReplay(1)
                .refCount()
            ;
            
            this.setCache(route.data.cacheId, feedObservable)
        }

        return feedObservable;
    }
}