import {EventEmitter, Injectable} from "@angular/core";
import {Feed} from "../Entity/Feed";
import {GetFeedRequest} from "../Http/Request/GetFeedRequest";

@Injectable()
export class FeedRequestService {

    public onFeedRequestResolve = new EventEmitter<GetFeedRequest>(true);
    
}