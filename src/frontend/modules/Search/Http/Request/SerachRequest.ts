import {GetFeedRequest} from "../../../Feed/Http/Request/GetFeedRequest";

export interface SearchRequest {
    query: string;
    params?: GetFeedRequest
}