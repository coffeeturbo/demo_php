import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Comment} from "../Entity/Comment";
import {CommentCreateRequest} from "../Http/Request/CommentCreateRequest";
import {CommentRESTService} from "./CommentRESTService";
import {VoteState} from "../../Vote/Entity/Vote";
import {VoteRESTService} from "../../Vote/Service/VoteRESTService";

@Injectable()
export class CommentService
{
    constructor(private rest: CommentRESTService, private voteRest: VoteRESTService) {}

    public getByPostId(postId: number): Observable<Comment>
    {
        return this.rest.getByPostId(postId);
    }

    public create(postCreateRequest: CommentCreateRequest): Observable<Comment>
    {
        return this.rest.create(postCreateRequest);
    }

    public vote(comment: Comment, state: VoteState): Observable<Comment>
    {
        let oldComment = comment;
        let voteObservable: Observable<Comment>;

        switch (state) {
            case "none":
                voteObservable = this.voteRest.deleteVoteComment(comment.id);
                break;
            case "positive":
                voteObservable = this.voteRest.positiveVoteComment(comment.id);
                break;
            case "negative":
                voteObservable = this.voteRest.negativeVoteComment(comment.id);
                break;
        }

        return voteObservable
            // .do(newComment => this.replaceInCache(oldComment, newComment))
        ;
    }    
}