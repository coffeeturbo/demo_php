import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {FeedRequestService} from "../../Feed/Service/FeedRequestService";
import {SearchRequest} from "../Http/Request/SerachRequest";

@Injectable()
export class SearchRequestResolver {
    constructor(private feedRequestService: FeedRequestService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchRequest> 
    {
        let serachRequest: SearchRequest = {query: route.params["path"]};
        
        return Observable.of(serachRequest)
            .do(serachRequest => this.feedRequestService.onFeedRequestResolve.emit(serachRequest))
            .delay(1)
        ;
    }
}