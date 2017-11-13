import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class TagTitleResolver implements Resolve<string> {

    resolve(route: ActivatedRouteSnapshot): Observable<string> {
        return Observable.of(route.params["path"]);
    }
}