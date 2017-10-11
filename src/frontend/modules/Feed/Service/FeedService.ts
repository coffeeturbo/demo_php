import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {FeedRESTService} from "./FeedRESTService";
import {Feed} from "../Entity/Feed";
import {PostResponse} from "../../Post/Http/Response/PostResponse";

@Injectable()
export class FeedService {
    constructor(private rest: FeedRESTService) {}

    public getByProfile(profileId: number, limit: number = 0, offset: number = 0) : Observable<Feed>
    {
        return this.rest.getByProfile(profileId, limit, offset)
            .map(feedResponse => feedResponse.entities
                .map((postResponse: PostResponse) => postResponse.entity)
                .map(postResponseEntity => {
                    postResponseEntity.tags = <any>postResponseEntity.tags.entities.map(tag => tag.entity);
                    postResponseEntity.attachments = <any>postResponseEntity.attachments.entities.map(attachments => attachments.entity);
                    return <any>postResponseEntity;
                })
            )
        ;
    }
}