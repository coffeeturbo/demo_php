import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";

import {Feed} from "../Entity/Feed";
import {AuthService} from "../../Auth/Service/AuthService";
import {GetFeedRequest} from "../Http/Request/GetFeedRequest";

@Injectable()
export class FeedRESTService {
    constructor(private rest: RESTService, private authService: AuthService) {}

    public get(limit: number, getFeedRequest?: GetFeedRequest): Observable<Feed>
    {
        let url = `/feed/limit/${limit}`;

        if(this.authService.isSignedIn()) {
            this.rest = this.rest.auth()
        }
        
        return this.rest
            .get(url, {search: getFeedRequest || {}})
            .map(res => res.json())
        ;
    }
}