import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {FeedRESTService} from "./FeedRESTService";
import {Feed} from "../Entity/Feed";

@Injectable()
export class FeedService {
    constructor(private rest: FeedRESTService) {}

    public getByProfile(profileId: number, limit: number = 0, offset: number = 0) : Observable<Feed>
    {
        return this.rest.getByProfile(profileId, limit, offset);
    }
}