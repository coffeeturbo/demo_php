import {EventEmitter, Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import 'rxjs/add/operator/publishReplay';

import {ProfileService} from "./ProfileService";
import {Feed} from "../../Feed/Entity/Feed";
import {FeedService} from "../../Feed/Service/FeedService";
import {Post} from "../../Post/Entity/Post";

@Injectable()
export class ProfileFeedResolver implements Resolve<Feed> {

    private cache: {
        profileId: number;
        feedObservable: Observable<Feed>;
    }[] = [];

    constructor(private profileService: ProfileService, private feedService: FeedService) {}

    private getCache(profileId: number) {
        return this.cache.find(cacheItem => cacheItem.profileId == profileId);
    }

    private setCache(cache) {
        this.cache.push(cache);
    }

    resolve(): Observable<Feed> {

        let onFeedLoad = new EventEmitter<Feed>();
        this.profileService.onProfileResolve
            .first()
            .map(profile => profile.id)
            .subscribe((profileId => {
                
                if(!this.getCache(profileId)) {
                    this.setCache({
                        profileId: profileId,
                        feedObservable: this.feedService
                            .get(10, {profile: profileId})
                            .publishReplay(1)
                            .refCount() 
                            .delay(1)
                    })
                }

                this.getCache(profileId)
                    .feedObservable.subscribe(feed => {
                        onFeedLoad.emit(<Feed>feed);
                        onFeedLoad.complete();
                    })
                ;
            }))
        ;

        return onFeedLoad;
    }

}