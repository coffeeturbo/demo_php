import {EventEmitter, Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {ProfileService} from "./ProfileService";
import {Feed} from "../../Feed/Entity/Feed";
import {FeedService} from "../../Feed/Service/FeedService";

@Injectable()
export class ProfileFeedResolver implements Resolve<Feed> {

    private cache;
    constructor(private profileService: ProfileService, private feedService: FeedService) {}

    resolve(): Observable<Feed> {
        
        let onFeedLoad = new EventEmitter<Feed>();
        this.profileService.onProfileResolve.first().subscribe((profile => {
            
            if(!this.cache) {
                this.cache = this.feedService
                    .getByProfile(profile.id, 20, 0)
                    .publishReplay(1)
                    .refCount()
                ;
            }
            
            this.cache.subscribe(feed => {
                    onFeedLoad.emit(<Feed>feed);
                    onFeedLoad.complete();
                })
            ;
        }));
        
        return onFeedLoad;
    }
}