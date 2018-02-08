import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {GetFeedRequest} from "../../Feed/Http/Request/GetFeedRequest";
import {FeedRequestService} from "../../Feed/Service/FeedRequestService";

@Injectable()
export class TagFeedRequestResolver {
    constructor(private feedRequestService: FeedRequestService) {
        
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetFeedRequest> {
        let tagId: number = +route.params["path"].replace(/^.*?(\d+)$/g, '$1');

        return Observable.of({tags: JSON.stringify([tagId])})
            .do(feedRequest => this.feedRequestService.onFeedRequestResolve.emit(feedRequest))
            .delay(1)
        ;
    }
}