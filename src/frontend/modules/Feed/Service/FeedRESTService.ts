import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Feed} from "../Entity/Feed";
import {GetFeedRequest} from "../Http/Request/GetFeedRequest";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class FeedRESTService {
    constructor(private http: HttpClient) {}

    public get(limit: number, getFeedRequest?: GetFeedRequest): Observable<Feed>
    {
        let url = `/feed/limit/${limit}`;

        return this.http
            .get<Feed>(url, {params: getFeedRequest, withCredentials: true})
        ;
    }
}