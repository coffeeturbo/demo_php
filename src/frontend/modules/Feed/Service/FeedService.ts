import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {FeedRESTService} from "./FeedRESTService";
import {Feed} from "../Entity/Feed";
import {GetFeedRequest} from "../Http/Request/GetFeedRequest";

@Injectable()
export class FeedService {
    
    constructor(private rest: FeedRESTService) {}

    public get(limit: number, getFeedRequest?: GetFeedRequest): Observable<Feed>
    {
        return this.rest.get(limit, getFeedRequest);
    }
}