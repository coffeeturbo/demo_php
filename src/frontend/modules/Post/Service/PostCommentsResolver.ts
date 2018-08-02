import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {Comment} from "../../Comment/Entity/Comment";
import {CommentService} from "../../Comment/Service/CommentService";
import {PostIdResolver} from "./PostIdResolver";

@Injectable()
export class PostCommentsResolver implements Resolve<Comment[]> {

    constructor(private commentService: CommentService, private postIdResolver: PostIdResolver) {}

    resolve(): Observable<Comment[]> {
        return this.postIdResolver.onResolve
            .flatMap((postId: number) => this.commentService.getByPostId(postId))
        ;
    }
}