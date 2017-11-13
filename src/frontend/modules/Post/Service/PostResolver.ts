import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {Post} from "../Entity/Post";
import {PostService} from "./PostService";

@Injectable()
export class PostResolver implements Resolve<Post>{
    
    constructor(private postService: PostService){}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Post> {
        let postId = route.params["path"].replace(/^.*?(\d+)$/g, '$1');
        return this.postService.get(postId);
    }
}