import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {Comment} from "../../Comment/Entity/Comment";
import {CommentService} from "../../Comment/Service/CommentService";
import {PostIdResolver} from "./PostIdResolver";

@Injectable()
export class PostCommentsResolver implements Resolve<Comment[]> {

    constructor(private commentService: CommentService, private postIdResolver: PostIdResolver) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Comment[]> {
        return this.postIdResolver.resolve(route)
            .flatMap((postId: number) => this.commentService.getByPostId(postId))
        ;
    }
}