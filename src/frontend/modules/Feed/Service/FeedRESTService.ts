import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";

import {FeedResponse} from "../Http/Response/FeedResponse";

@Injectable()
export class FeedRESTService {
    constructor(private rest: RESTService) {}
    
    public getByProfile(profileId: number, limit: number = 0, offset: number = 0) : Observable<FeedResponse> 
    {
        let url = `/feed/profile/${profileId}/limit/${limit}/offset/${offset}`;

        return this.rest
            .get(url)
            .map(res => res.json())
        ;
    }
}