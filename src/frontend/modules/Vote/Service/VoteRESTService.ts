import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../../Post/Entity/Post";
import {HttpClient} from "@angular/common/http";
import {Comment} from "../../Comment/Entity/Comment";

@Injectable()
export class VoteRESTService
{
    constructor(private http: HttpClient) {}

    public deleteVotePost(postId: number): Observable<Post>
    {
        let url = `/protected/vote/post/${postId}/delete`;

        return this.http
            .delete<Post>(url, {withCredentials: true})
        ;
    }

    public positiveVotePost(postId: number): Observable<Post>
    {
        let url = `/protected/vote/post/${postId}/positive`;

        return this.http
            .post<Post>(url, null, {withCredentials: true})
        ;
    }

    public negativeVotePost(postId: number): Observable<Post>
    {
        let url = `/protected/vote/post/${postId}/negative`;

        return this.http
            .post<Post>(url, null, {withCredentials: true})
        ;
    }
    
    public deleteVoteComment(commentId: number): Observable<Comment>
    {
        let url = `/protected/vote/comment/${commentId}/delete`;

        return this.http
            .delete<Comment>(url, {withCredentials: true})
        ;
    }

    public positiveVoteComment(commentId: number): Observable<Comment>
    {
        let url = `/protected/vote/comment/${commentId}/positive`;

        return this.http
            .post<Comment>(url, null, {withCredentials: true})
        ;
    }

    public negativeVoteComment(commentId: number): Observable<Comment>
    {
        let url = `/protected/vote/comment/${commentId}/negative`;

        return this.http
            .post<Comment>(url, null, {withCredentials: true})
        ;
    }    
}