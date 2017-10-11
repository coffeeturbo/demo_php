import {Response} from "../../../Application/Http/Response";
import {PostResponse} from "../../../Post/Http/Response/PostResponse";

export interface FeedResponse extends Response {
    entities: PostResponse[]
    total: number;
}