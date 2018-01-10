import {EventEmitter, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {PostService} from "./PostService";
import {Comment} from "../../Comment/Entity/Comment";
import {CommentService} from "../../Comment/Service/CommentService";

@Injectable()
export class PostCommentsResolver implements Resolve<Comment[]>{


    constructor(private commentService: CommentService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Comment[]> {
        let postId = route.params["path"].replace(/^.*?(\d+)$/g, '$1');
        return this.commentService.getByPostId(postId);
    }
}