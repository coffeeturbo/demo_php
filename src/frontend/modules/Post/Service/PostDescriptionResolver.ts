 import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {PostResolver} from "./PostResolver";

@Injectable()
export class PostDescriptionResolver implements Resolve<string> {

    constructor(private postResolver: PostResolver) {}

    resolve(): Observable<string> {
        return this.postResolver.onResolve
            .map(post => {
                if(post.seo && post.seo.description) {
                    return post.seo.description;
                } else {
                    return post.title
                }
            })
            .catch(() => Observable.of("Post not found"))
        ;
    }
}