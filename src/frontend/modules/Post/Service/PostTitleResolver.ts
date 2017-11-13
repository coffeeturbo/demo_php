import {EventEmitter, Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";

import {PostService} from "./PostService";

@Injectable()
export class PostTitleResolver implements Resolve<string>{


    constructor(private postService: PostService) {}

    resolve(): Observable<string> {
        let onTitleLoad = new EventEmitter<string>();

        this.postService.onPostResolve
            .first()
            .map(post => post.title)
            .subscribe((title) => {
                onTitleLoad.emit(title);
                onTitleLoad.complete();
            });

        return onTitleLoad;
    }
}