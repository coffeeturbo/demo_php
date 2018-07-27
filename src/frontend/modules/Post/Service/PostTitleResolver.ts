 import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {PostResolver} from "./PostResolver";

@Injectable()
export class PostTitleResolver implements Resolve<string> {

    constructor(private postResolver: PostResolver) {}

    resolve(): Observable<string> {
        return this.postResolver.onResolve
            .map(post => post.title)
            .catch(() => Observable.of("Post not found"))
        ;
    }
}