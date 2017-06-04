import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {Post} from "../Entity/Post";

@Injectable()
export class PostTitleResolver implements Resolve<string>{
    resolve(route: ActivatedRouteSnapshot): Observable<string> {
        return Observable.of("Post");
    }
}