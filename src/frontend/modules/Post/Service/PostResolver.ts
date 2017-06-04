import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";

import {Post} from "../Entity/Post";

@Injectable()
export class PostResolver implements Resolve<Post>{
    resolve(route: ActivatedRouteSnapshot): Observable<Post> {
        return Observable.of(null);
    }
}