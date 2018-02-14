import {EventEmitter, Injectable} from "@angular/core";
import {GetFeedRequest} from "../Http/Request/GetFeedRequest";
import {SearchRequest} from "../../Search/Http/Request/SerachRequest";

@Injectable()
export class FeedRequestService {

    public onFeedRequestResolve = new EventEmitter<GetFeedRequest| SearchRequest>(true);
    
}