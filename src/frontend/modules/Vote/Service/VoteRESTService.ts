import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";
import {Post} from "../../Post/Entity/Post";

@Injectable()
export class VoteRESTService {
    
    constructor(private rest: RESTService) {}


    deleteVotePost(postId: number): Observable<Post>
    {
        let url = `/protected/vote/post/${postId}/delete`;

        return this.rest
            .auth()
            .delete(url)
            .map(res => res.json())
        ;
    }

    positiveVotePost(postId: number): Observable<Post>
    {
        let url = `/protected/vote/post/${postId}/positive`;

        return this.rest
            .auth()
            .post(url, null)
            .map(res => res.json())
        ;
    }

    negativeVotePost(postId: number): Observable<Post>
    {
        let url = `/protected/vote/post/${postId}/negative`;

        return this.rest
            .auth()
            .post(url, null)
            .map(res => res.json())
        ;
    }
}