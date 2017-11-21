import {GetFeedRequest} from "../Http/Request/GetFeedRequest";
import {Observable} from "rxjs/Observable";
import {Feed} from "./Feed";

export interface FeedCache {
    feedRequest: GetFeedRequest;
    scroll?: number;
    observable: Observable<Feed>;
}