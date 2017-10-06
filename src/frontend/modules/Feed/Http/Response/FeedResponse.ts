import {Response} from "../../../Application/Http/Response";
import {Post} from "../../../Post/Entity/Post";
import {Feed} from "../../Entity/Feed";

export interface FeedResponse extends Response, Feed {
    total: number;
}