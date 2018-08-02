import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {Post} from "../Entity/Post";
import {PostService} from "./PostService";
import {PostIdResolver} from "./PostIdResolver";

@Injectable()
export class PostResolver implements Resolve<Post> {

    public onResolve: Observable<Post>;
    
    constructor(private postService: PostService, private postIdResolver: PostIdResolver) {}
    
    resolve(): Observable<Post> {
        this.onResolve = this.postIdResolver.onResolve
            .flatMap((postId: number) => this.postService.get(postId))
            .publishReplay(1)
            .refCount()
        ;
        
        return this.onResolve
            .catch(() => Observable.of(null)) // if post not found
    }
}